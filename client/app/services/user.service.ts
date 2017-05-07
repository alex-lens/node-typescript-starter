import {Injectable} from '@angular/core';

import { Headers, Response } from '@angular/http';
import { HttpService } from '../services/http.service';
import { User } from "../models/user";
import 'rxjs/add/operator/toPromise';
import { CONSTANTS }  from './../services/constant.service';



@Injectable()
export class UserService {

    private usersUrl = '/api/users';  // URL to web api

    constructor(public http: HttpService) { }

    getUsers(): Promise<User[]> {
        return this.http.get(CONSTANTS.API_URL + this.usersUrl)
            .toPromise()
            .then(response => response.json());
    }

    getUser(id: string) {
        return this.http.get(this.usersUrl + '/' + id)
            .toPromise()
            .then(response => response.json());
    }

    signUp(user: User): Promise<User>  {
        let url = `/signUp`;

        return this.http
            .post(url, user)
            .toPromise()
            .then(() => user);
    }

    signIn(user: User): Promise<User>  {
        let url = `/signIn`;

        return this.http
            .post(url, user)
            .toPromise()
            .then(() => user);
    }

    save(user: User): Promise<User>  {
        let url = `${this.usersUrl}/${user._id}`;

        return this.http
            .put(url, user)
            .toPromise()
            .then(() => user);
    }

    private post(user: User): Promise<User> {
        let headers = new Headers({
         });

        return this.http
            .post(this.usersUrl, user)
            .toPromise()
            .then(response => response.json().data);
    }



    delete(user: User) {


        let url = `${this.usersUrl}/${user._id}`;

        return this.http
            .delete(url)
            .toPromise();
    }

}