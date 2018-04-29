//require('source-map-support').install();

import { Component, OnInit, OnDestroy,  EventEmitter, Output } from '@angular/core';
import { FacebookApiService } from '../shared/services/facebook-api.service';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public profile:any;
  public music:any;
  private loggedSucriber: Subscription = null
  public isLogged: boolean = false;

  @Output() onGetProfile: EventEmitter<any> = new EventEmitter();

  constructor(private facebookAPI: FacebookApiService) { }
  ngOnInit() {}

  /**
   * LOGGIN CALL FUNCTION
   */
  public loginWithFacebook(): void{
  	 this.facebookAPI.loginWithOptions();
  	 this.onLogged();
  }

/**
   * CREATE A CUSTOM METHOD WHEN THE USER IS COMPLETELY LOGGED
   */
  public onLogged():void{   //on logged we call methods to get USER information
  	  this.loggedSucriber = this.facebookAPI.onLoggedEvent.subscribe((status)=>{
	  	  	if(status === "connected"){	  	
	  	  		this.isLogged = true;
	  	  		this.getUserProfile();
	  	  		this.getUserMusic();
	  	  		this.getUserProfilePicture();	  	  							  	
	  	  	}else{
	  	  		this.isLogged = false;
	  	  		swal({
				  	title: "Sorry, you cannot loggin, try once again.",
				  	type: 'error',
					width: 600,
					//background: '#BDBDBD',
					confirmButtonColor:'#343a40',
				});	  
	  	  	}
       });
  }


  /**
   * GET INFORMATION ABOUT USER USING FB SERVICE METHODS
   */
  public validateStatus(){
  	if(this.facebookAPI.getStatus() !== "connected"){
  		this.isLogged = false;
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
  	   this.facebookAPI.getProfilePicture('large').then((profilePicture)=>{
  	   		this.profile.picture = profilePicture.data.url;
  	   		this.onGetProfile.emit(this.profile);
       });
  }

  public logOut():void{
  	this.isLogged = false;
  	this.facebookAPI.logOut();
  }


  ngOnDestroy(){        
        this.loggedSucriber.unsubscribe();
    }
}

//# sourceMappingURL=inicio.componente.ts