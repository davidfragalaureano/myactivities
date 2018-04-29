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
  public profilePicture:any;
  private loggedSucriber: Subscription = null
  public logged: boolean = false;

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
	  	  		this.getUserProfile();
	  	  		this.getUserMusic();
	  	  		//this.getUserProfilePicture();	  	  							  	
	  	  	}else{
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
  		this.logged = false;
  	}
  }

  public getUserProfile(): void{
  	   this.facebookAPI.getProfile().then((profile)=>{
  	   		this.profile = profile;
  	   		this.onGetProfile.emit(profile);
       });
  }

  public getUserMusic():void{
  	   this.facebookAPI.getMusic().then((music)=>{
  	   		this.music = music;
       });
  }

  public getUserProfilePicture():void{
  	   this.facebookAPI.getProfilePicture().then((profilePicture)=>{
  	   		this.profilePicture = profilePicture;
       });
  }


  ngOnDestroy(){        
        this.loggedSucriber.unsubscribe();
    }
}

//# sourceMappingURL=inicio.componente.ts