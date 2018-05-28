import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";

export class ErrorInterceptor implements HttpInterceptor {

    @Injectable()
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, cought) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj)
            }

            console.log("Erro detectado pelo Interceptor");
            console.log(errorObj);
            return Observable.throw(errorObj);
        }) as any;
    }

    
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}