import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(
        public http: HttpClient, 
        public storage: StorageService){
    }

    public findByEmail(email: String) {
        return this.http.get(`${API_CONFIG.base_url}/clientes/email?value=${email}`);
    }

    public getImageFromBucket(id: String) : Observable<any> {
        let url = `${API_CONFIG.bucket_base_url}/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    public insert(obj: ClienteDTO){
        return this.http.post(`${API_CONFIG.base_url}/clientes`, obj, {
            observe: "response",
            responseType: "text"
        });
    }
}