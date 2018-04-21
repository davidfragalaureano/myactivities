//require('source-map-support').install();

import { Component, OnInit } from '@angular/core';
import { FacebookApiService } from '../shared/services/facebook-api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public profile:any;

  constructor(private facebookAPI: FacebookApiService) { }
  ngOnInit() {  	
  }

  public loginWithFacebook(): void{
  	 this.facebookAPI.loginWithOptions();  	 		  	
  }

  public logged(status):any{
  	  this.facebookAPI.getProfile().then((res: any) => {
  	  	  console.log(status);
          this.profile  = res;
          console.log(this.profile);
      }).catch((error) => {
      		console.log(status);
          console.error('Error getting profile information',error);
      });
  }

}

//# sourceMappingURL=inicio.componente.ts