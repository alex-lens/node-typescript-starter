import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';


import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { HeroesComponent }      from './components/heroes/heroes.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';
import { SignInComponent }  from './components/signIn/signin.component';

import { UserService }  from './services/user.service';
import { HeroService }  from './services/hero.service';
import { AuthService }  from './services/auth.service';
import { HttpService }  from './services/http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
    ],
  declarations: [
      AppComponent,
      HeroesComponent,
      DashboardComponent,
      HeroDetailComponent,
      SignInComponent,
  ],
  providers: [
      UserService,
      AuthService,
      HeroService,
      SignInComponent,
      {
          provide: HttpService,
          useFactory: (backend: XHRBackend, options: RequestOptions) => {
              return new HttpService(backend, options);
          },
          deps: [XHRBackend, RequestOptions]
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
