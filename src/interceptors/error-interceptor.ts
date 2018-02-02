import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http/src/request";
import { HttpHandler } from "@angular/common/http/src/backend";
import { Observable } from "rxjs/Rx";
import { HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        console.log("passou no interceptor");
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

                return Observable.throw(erroObj);    
            }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,   
}