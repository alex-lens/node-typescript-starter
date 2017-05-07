import {Injectable} from '@angular/core';

import { HttpService } from '../services/http.service';
import { User } from "../models/user";
import 'rxjs/add/operator/toPromise';
import { CONSTANTS }  from './../services/constant.service';

@Injectable()
export class AuthService {

    private tokenField = 'authToken';

    constructor(public http: HttpService) {

    }

    public signUp(user: User): Promise<any>  {
        return this.http
            .post(CONSTANTS.API_URL + '/signUp', user)
            .toPromise()
            .then(() => user);
    }

    public signIn(user: User): Promise<any>  {
        return this.http
            .post(CONSTANTS.API_URL + '/signIn', user)
            .toPromise()
            .then((response: any) => {
                response = response.json();
                this.setToken(response.token);
            });
    }

    public signOut(): void  {
        localStorage.removeItem(this.tokenField);
    }

    public isAuthorized(): boolean {
        return !!this.getToken();
    }

    private setToken(token): void {
        localStorage.setItem(this.tokenField, token);
    }

    private getToken(): string | boolean {
        return localStorage.getItem(this.tokenField) || false;
    }

}