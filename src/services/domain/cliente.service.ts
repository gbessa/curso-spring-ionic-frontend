import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {
    }

    findById(id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }    

    findByEmail(email: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: ClienteDTO): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataURItoBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`,
        formData,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

}