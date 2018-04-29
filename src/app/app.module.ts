import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FacebookModule } from 'ngx-facebook';
import { FacebookApiService } from './shared/services/facebook-api.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [FacebookApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
