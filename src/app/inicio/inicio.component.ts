import { Component, OnInit } from '@angular/core';
import { FacebookApiService } from '../shared/services/facebook-api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private facebookAPI: FacebookApiService) { }
  ngOnInit() {}

  public loginWithFacebook(): void{
  	 this.facebookAPI.loginWithOptions();
  }

}