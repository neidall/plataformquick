import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDataI, UsuarioI } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logeado : boolean =false;
  nombre : any = "juan";
  rol: any= "";
   
  
  constructor( private authService : AuthService ,private router: Router, private firestore:ProyectosService) {
// this.obtenerUsuarioLogeado();

this.authService.getUserLoged().subscribe(res =>{

  if (res) {
    console.log('usuario logueago');        
    this.logeado = true;
    this.getDatosUser(res.uid);
    console.log(res.uid);
    
  }
  else{
    console.log('usuario no logeado');
    this.logeado = false;
  }
})
  }

  ngOnInit(): void {
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
}

getDatosUser(uid : any){
 const path = "usuarios";
 const id = uid;
 this.firestore.getDoc<UsuarioI>(path, id).subscribe(res=>{
  console.log( "el res es = " , res);
  if (res){
   this.nombre =  res.nombre,
   this.rol = res.cargo

   console.log();
   
  } {
    
  }  
 })
}


}
