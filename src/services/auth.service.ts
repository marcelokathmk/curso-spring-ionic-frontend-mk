import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local-user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public cartService: CartService){

    }

    public authenticate(creds : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.base_url}/login`, 
                        creds, 
                        {   
                            observe: 'response',
                            responseType: 'text'
                        });
    }

    public sucessfullLogin(authorizationValue : String){
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    public logout(){
        this.storage.setLocalUser(null);
    }

    public refreshToken(){
        return this.http.post(`${API_CONFIG.base_url}/auth/refresh_token`, 
                        {}, 
                        {   
                            observe: 'response',
                            responseType: 'text'
                        });
    } 
}