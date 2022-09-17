import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDataI, UsuarioI } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { LoginComponent } from '../login/login.component';
import { getAuth, onAuthStateChanged } from "firebase/auth";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logeado : boolean =false;
  nombre : string = "";
  rol: string = "";
  activo : boolean = false;
  idd : string = ""
  

  
  constructor( private authService : AuthService ,private router: Router, private firestore:ProyectosService) {
// this.obtenerUsuarioLogeado();
  
// this.authService.getUserLoged().subscribe(res =>{

//   if (res) {
//     // console.log('usuario logueago');  
//      this.logeado = true;
//        // this.getDatosUser(res.uid);
//     //  this.getDatosUser(res.uid);  console.log(res.uid);
//      this.firestore.getDoc<UsuarioI>('usuarios', res.uid).subscribe(res=>{
//       console.log(res);
      
//       if (res){
//        this.nombre = res.nombre.toUpperCase();
//        this.rol = res.cargo;
//        console.log(this.rol, this.nombre);
       
//       }else{
//         console.log('no devolvio nada');
        
//       }
//   })
   
//   } 
//   else{
//     console.log('usuario no logeado');
//     this.logeado = false;
//     this.logout()
//   }
  


  
// })
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("activo");
    
    this.logeado = true;
    
  this.firestore.getDoc<UsuarioI>('usuarios', user.uid).subscribe(res=>{
   console.log(res);
   
   if (res){

    this.nombre = res.nombre.toUpperCase();
    this.rol = res.cargo;
    this.idd = res.uid;
    console.log(this.rol, this.nombre);
    
    
   }else{
     console.log('no devolvio nada');
     
   }
    
    // ...
  });
  }else {
    // User is signed out
    this.logout()
    console.log("inactivo");
    // ...
  }
});




}






  ngOnInit(): void {
  }




// getDatosUser(uid : string){
//  const path = "usuarios";
//  const id = uid;
//  this.firestore.getDoc<UsuarioI>(path, id).subscribe(res=>{
//   console.log(res);
  
//   if (res){
//    this.nombre = res.nombre.toUpperCase();
//    this.rol = res.cargo;
//    console.log(this.rol, this.nombre);
   
//   } 
//  })
// }

logout(){
  this.authService.logout();
  this.router.navigate(['login']);
  this.logeado=false;
  
}


}
