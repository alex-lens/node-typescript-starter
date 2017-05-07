import {Component} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CONSTANTS }  from './services/constant.service';

@Component({
    selector:    'my-app',
    templateUrl: './app/app.html'
})

export class AppComponent {
    title = 'Todos';

    constructor(
        private router: Router,
        private Auth: AuthService,
    ) {
    }

    public isAuthorized(): boolean {
        return this.Auth.isAuthorized();
    }

    public signOut(): void {
        this.Auth.signOut();
        this.router.navigate([ '/' + CONSTANTS.DASHBOARD_ROUT ]);
    }
}