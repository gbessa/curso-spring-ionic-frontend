import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";
import { Observable } from "rxjs/Rx";
import { CategoriaDTO } from "../../models/categoria.dto";

@Injectable()
export class ProdutoService {

    constructor(
        public http: HttpClient) {
    }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string): Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}`);
    }

    getSmallImageFromBucket(produto_id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseURL}/prod${produto_id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket(produto_id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseURL}/prod${produto_id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }
}