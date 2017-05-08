
import {Component, Input,  OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService }  from './../../services/auth.service';


@Component({
    selector: 'sign-in',
    templateUrl: './app/components/signIn/signin.component.html',
    styleUrls: ['./app/components/signIn/signin.component.css']
})

export class SignInComponent implements OnInit {

    @Input() user;

    constructor(private router: Router, private AuthService: AuthService) {
        this.user = {};
    }

    ngOnInit() {
        if (this.AuthService.isAuthorized()) {
            this.router.navigate(['/dashboard']);
        }
    }

    signIn() {
        this.AuthService.signIn(this.user).then(() => {
            this.router.navigate(['dashboard']);
        }).catch((error) => {
            console.log('error nah');
        });
    }

}
