import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http/src/request";
import { HttpHandler } from "@angular/common/http/src/backend";
import { Observable } from "rxjs/Rx";
import { HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
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
                    case 403:
                    this.handle403();
                    break;
                }

                return Observable.throw(erroObj);    
            }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,   
}