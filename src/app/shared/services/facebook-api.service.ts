import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClientModule } from '@angular/common/http';
import { FacebookService, InitParams, LoginOptions , LoginResponse} from 'ngx-facebook';

@Injectable()
export class FacebookApiService {

  /**
   * variables to connect Facebook applicaton with angular
   */
  private readonly appId:string = '428890384200620';
  private readonly version: string = 'v2.11';
  private onLogged: any = new Subject<any>();
  public onLoggedEvent = this.onLogged.asObservable();
  private scopes:string;

  /**boolean
   * this component receives a FB API service
    @param FacebookService
   */
  constructor(private fb: FacebookService) {
    this.scopes = 'public_profile,user_friends,email,user_location,'+
                  'user_likes,user_photos,user_posts,user_tagged_places,'+
                  'user_videos'
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


  public getStatus(): string{
      return localStorage.getItem('status');
  }

  private setStatus(status: string): void{
      localStorage.setItem('status',status);
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
      scope: this.scopes
    };

    this.fb.login(loginOptions).then((res: LoginResponse) => {        
         console.log('Logged in', res);                             
         this.setAccesToken(res.authResponse.accessToken);
         this.setuserID(res.authResponse.userID);
         this.setStatus(res.status); 
         this.onLogged.next(res.status);                
     }).catch((error) => {              
           console.error('Error logging',error);
     });
  }

  /**
   * getting porfile information about user logged 
   */
  public getProfile() :Promise<any>{
      return this.fb.api('/'+this.getuserID());
    }

   /**
   * return music's  taste user
   */
  public getMusic() :Promise<any>{
      return this.fb.api('/'+this.getuserID()+'/music?limit=50');       
    }

    /**
   * return unread notifications
   */
  public getUnreadNotifications() :void{
    this.fb.api('/'+this.getuserID()+'/notifications')
      .then((res: any) => {
        console.log('Got the users notifications', res);
      }).catch((error) => {
          console.error('Error getting profile information',error);
      });
    }

    /**
   * return unread notifications
   */
   public getProfilePicture():Promise<any>{ 
     return this.fb.api('/'+this.getuserID()+'/picture?fields=url&redirect=false'); 
   }


   public logOut():void{
     this.fb.logout().then(() => console.log('Logged out!'));
     localStorage.clear();
   }


}
