//require('source-map-support').install();

import { Component, OnInit } from '@angular/core';
import { FacebookApiService } from '../shared/services/facebook-api.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public profile:any;
  private loggedSucriber: Subscription = null

  constructor(private facebookAPI: FacebookApiService) { }
  	ngOnInit() {  	
  }

  public loginWithFacebook(): void{
  	 this.facebookAPI.loginWithOptions();
  	 this.onLogged();
  }

  public onLogged():void{
  	  this.loggedSucriber = this.facebookAPI.onLoggedEvent.subscribe((data)=>{
            console.log('logged status:',data);
       });
  }

  public getUserInfo(): void{

  }


  ngOnDestroy(){        
        this.loggedSucriber.unsubscribe();
    }
}

//# sourceMappingURL=inicio.componente.ts