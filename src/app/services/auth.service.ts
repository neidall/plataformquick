import { BoundElementProperty } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsuarioI } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // admi:boolean=false
  
  constructor( private autentication : AngularFireAuth, private firestore: AngularFirestore) { }



  async login(email: string, password :string){
    try {
      return await this.autentication.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error en login", error);
      return null
      
    }
  }
  
  async register(datos:UsuarioI){
    
    try {
      return await this.autentication.createUserWithEmailAndPassword(datos.email, datos.password);
    } catch (error) {
      console.log("se produjo un error al registrarse", error);
      return null
      // pregunta sobre formas de registro de usuario al registar usuario inicia secion
    }   
  }

  
  
getUserLoged(){
   return this.autentication.authState;
}




logout(){
 this.autentication.signOut();
}

}
