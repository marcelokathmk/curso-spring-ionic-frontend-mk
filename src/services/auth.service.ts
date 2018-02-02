import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local-user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){

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
            token: token
        };
        this.storage.setLocalUser(user);
    }

    public logout(){
        this.storage.setLocalUser(null);
    }
}