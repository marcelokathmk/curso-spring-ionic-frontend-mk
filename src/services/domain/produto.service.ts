import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){

    }

    public findByCategoria(categoriaId: String){
        return this.http.get(`${API_CONFIG.base_url}/produtos/?categorias=${categoriaId}`);
    }

    public getSmallImageFromBucket(id: String) : Observable<any> {
        let url = `${API_CONFIG.bucket_base_url}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : "blob"});
    }
}