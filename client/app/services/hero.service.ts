import {Injectable} from '@angular/core';

import { Headers, Response } from '@angular/http';
import { HttpService } from '../services/http.service';
import 'rxjs/add/operator/toPromise';
import {Hero} from "../models/hero";

@Injectable()
export class HeroService {

    private heroesUrl = 'api/users';  // URL to web api

    constructor(public http: HttpService) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getHero(id: string) {
        return this.http.get(this.heroesUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero>  {
        if (hero._id) {
            return this.put(hero);
        }
        return this.put(hero);
    }

    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
        });

        return this.http
            .post(this.heroesUrl, hero)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(hero: Hero) {
        let url = `${this.heroesUrl}/${hero._id}`;

        return this.http
            .put(url, hero)
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {


        let url = `${this.heroesUrl}/${hero._id}`;

        return this.http
            .delete(url)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}