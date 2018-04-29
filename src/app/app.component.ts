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


 public welcome(dataUser):void{
  		swal({
		  	title: "Welcome!, "+ dataUser.name,
		  	type: 'success',
			width: 600,
			//background: '#BDBDBD',
			confirmButtonColor:'#343a40',
		});	  
 }

}
