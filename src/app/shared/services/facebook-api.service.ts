import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginOptions , LoginResponse} from 'ngx-facebook';

@Injectable()
export class FacebookApiService {

  /**
   * variables to connect Facebook applicaton with angular
   */
  private readonly appId:string = '428890384200620';
  private readonly version: string = 'v2.8';
  /**
   * this component receives a FB API service
    @param FacebookService
   */
  constructor(private fb: FacebookService) {
     
    let initParams: InitParams = {
      appId: this.appId,
      xfbml: true,
      version: this.version
    };
 
    fb.init(initParams);
  }

   /**  

    --- GETTERS AND SETTERS

   * Delete access token in local storage (Log out)
   */
  public getAccesToken(): string{
     return localStorage.getItem('accessToken');
  }

  public getuserID(): string{
      return localStorage.getItem('userID');
  }

  private setuserID(userID: string): void{
      localStorage.setItem('userID',userID);
  }
  /** 
   * Store access token in local storage
   @param accessToken : token received from the login fb api
   */
  private setAccesToken(accessToken: string): void{
      localStorage.setItem('accessToken',accessToken);
  }

  /** 
   * Login with additional permissions/options  
   */
  public loginWithOptions() :void{

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,user_location,user_likes,user_photos,user_posts,user_tagged_places,user_videos'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);  
         this.setAccesToken(res.authResponse.accessToken);
         this.setuserID(res.authResponse.userID);
         this.getMusic();
      }).catch((error) => {
      		console.error('Error logging',error);
      });
  }

  /**
   * getting porfile information about user logged 
   */
  public getProfile() :void{
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
      }).catch((error) => {
      		console.error('Error getting profile information',error);
      });
    }


   /**
   * return music's  taste user
   */
  public getMusic() :void{
    this.fb.api('/'+this.getuserID()+'/music')
      .then((res: any) => {
        console.log('Got the users music', res);
      }).catch((error) => {
          console.error('Error getting profile information',error);
      });
    }


   public logOut():void{
     this.fb.logout().then(() => console.log('Logged out!'));
     localStorage.clear();
   }



}