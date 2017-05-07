import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService extends Http {

    constructor (backend: XHRBackend, options: RequestOptions) {
        let token = localStorage.getItem('authToken'); // your custom token getter function here
        options.headers.set('Content-Type', 'application/json');
        //options.headers.set('Authorization', `Bearer ${token}`);
        super(backend, options);
    }

    request(request: any, options?: RequestOptionsArgs): Observable<Response> {
        let token = localStorage.getItem('authToken');
        if (typeof request === 'string') {
            if (!options) {
                options = {headers: new Headers()};
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        } else if (token) {
            //url._body = JSON.stringify(url._body);
            request.headers.set('Authorization', `Bearer ${token}`);
        }
        return super.request(request, options)
            .catch(
                this.catchAuthError(this)
            );
    }

    private catchAuthError (self: HttpService) {
        return (res) => {
            //console.log(res);
            if (res.status === 401 || res.status === 403) {
                //console.log(res);
            }

            return Observable.throw(res.json());
        };
    }
}