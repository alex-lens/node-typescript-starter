import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent}   from './components/dashboard/dashboard.component';
import {HeroesComponent}      from './components/heroes/heroes.component';
import {HeroDetailComponent}  from './components/heroDetail/hero-detail.component';
import {SignInComponent}      from './components/signIn/signin.component';
import { CONSTANTS }          from './services/constant.service';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/' + CONSTANTS.SIGN_IN_ROUT,
        pathMatch: 'full'
    },
    {
        path: CONSTANTS.DASHBOARD_ROUT,
        component: DashboardComponent
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: CONSTANTS.SIGN_IN_ROUT,
        component: SignInComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: false});
