import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { InicioComponent } from './inicio/inicio.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


 public welcome(user_profile:any):void{
  		swal({
		  	title: "<h1>Welcome!, "+ user_profile.name + '</h1>',
		  	type: 'success',
		  	html:true,
			width: 600,
			imageUrl: user_profile.url,
			//background: '#BDBDBD',
			confirmButtonColor:'#343a40',
			 footer: '<a href>This site is in development, will be done as soon as posible!</a>',
		});	  
 }

}
