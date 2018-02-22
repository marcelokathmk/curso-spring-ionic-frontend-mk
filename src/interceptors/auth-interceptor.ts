import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http/src/request";
import { HttpHandler } from "@angular/common/http/src/backend";
import { Observable } from "rxjs/Rx";
import { HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(public storage: StorageService){

    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let n = API_CONFIG.base_url.length;
        let requestToAPI = req.url.substring(0, n) == API_CONFIG.base_url;
        if  (localUser && requestToAPI){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+ localUser.token)});
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,   
}