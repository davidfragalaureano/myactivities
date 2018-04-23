//require('source-map-support').install();

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacebookApiService } from '../shared/services/facebook-api.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public profile:any;
  public music:any;
  public profilePicture:any;
  private loggedSucriber: Subscription = null
  public logged: boolean = false;

  constructor(private facebookAPI: FacebookApiService) { }
  ngOnInit() {}

  public loginWithFacebook(): void{
  	 this.facebookAPI.loginWithOptions();
  	 this.onLogged();
  }

  public onLogged():void{   //on logged we call methods to get USER information
  	  this.loggedSucriber = this.facebookAPI.onLoggedEvent.subscribe((data)=>{
  	  	if(data.status){
  	  			this.getUserProfile();
  	  			this.getUserMusic();
  	  	}else{

  	  	}
       });
  }

  public validateStatus(){
  	if(this.facebookAPI.getStatus() !== "connected"){
  		this.logged = false;
  	}
  }

  public getUserProfile(): void{
  	   this.facebookAPI.getProfile().then((profile)=>{
  	   		this.profile = profile;
       });
  }

  public getUserMusic():void{
  	   this.facebookAPI.getMusic().then((music)=>{
  	   		this.music = music;
       });
  }

  public getUserProfilePicture():void{
  	   this.facebookAPI.getMusic().then((profilePicture)=>{
  	   		this.profilePicture = profilePicture;
       });
  }

  ngOnDestroy(){        
        this.loggedSucriber.unsubscribe();
    }
}

//# sourceMappingURL=inicio.componente.ts