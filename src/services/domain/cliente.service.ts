import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: String) : Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${API_CONFIG.base_url}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: String) : Observable<any> {
        let url = `${API_CONFIG.bucket_base_url}/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }
}