import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http/src/request";
import { HttpHandler } from "@angular/common/http/src/backend";
import { Observable } from "rxjs/Rx";
import { HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storage: StorageService, public alertController: AlertController){

    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let erroObj = error;
                if  (erroObj.error){
                    erroObj = erroObj.error;        
                }
                if  (!erroObj.status){
                    erroObj = JSON.parse(erroObj);
                }

                console.log("Erro detectado pelo interceptor:");
                console.log(erroObj);

                switch(erroObj.status){
                    case 401:
                    this.handle401();
                    break;
                    
                    case 403:
                    this.handle403();
                    break;

                    case 422:
                    this.handle422(erroObj);
                    break;

                    default:
                    this.handleDefaultError(erroObj);
                    break;
                }

                return Observable.throw(erroObj);    
            }) as any;
    }

    public handle422(erroObj){
        let alert = this.alertController.create({
            title: "Erro 422: Validação",
            message: this.listErrors(erroObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "Ok"
                }
            ] 
        });
        alert.present();
    }

    public handle403(){
        this.storage.setLocalUser(null);
    }

    public handle401(){
        let alert = this.alertController.create({
            title: "Erro 401: Falha de Autenticação",
            message: "Email ou Senha incorretos",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "Ok"
                }
            ] 
        });
        alert.present();
    }

    public handleDefaultError(erroObj){
        let alert = this.alertController.create({
            title: "Erro "+ erroObj.status +": "+ erroObj.error,
            message: erroObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "Ok"
                }
            ] 
        });
        alert.present();
    }

    public listErrors(messages: FieldMessage[]) : string{
        let s : string = "";
        for (let i = 0; i < messages.length; i++) {
            s = s + "<p><strong>"+ messages[i].fieldName + "</strong>: " + messages[i].message + "</p>";
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,   
}