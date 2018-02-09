import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){

    }

    public findByCategoria(categoriaId: String){
        return this.http.get(`${API_CONFIG.base_url}/produtos/?categorias=${categoriaId}`);
    }
}