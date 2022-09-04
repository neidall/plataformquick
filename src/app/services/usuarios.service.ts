import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDataI } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  listaUsuarios: UsuarioDataI[] = [{
    id : '1',
    foto: "asd",
    nombre:"ss" ,
    estado: "ss",
    },{
      id : '2',
      foto: "asd",
      nombre:"ss" ,
      estado: "ss",
      },{
        id : '3',
        foto: "asd",
        nombre:"ss" ,
        estado: "ss",
        }
    
    
  ];

  constructor(private router:Router) {
    this.cargarDatos();
   }

  getUsuario():UsuarioDataI[]{
    //slice retornar una copia del array
    return this.listaUsuarios.slice();
 }
 agregarUsuario(usuario:UsuarioDataI){

  this.listaUsuarios.unshift(usuario);
  localStorage.setItem("listaAgenda", JSON.stringify( this.listaUsuarios));
  this.cargarDatos();
8
}

eliminarUsuario(usuario:any){
  this.listaUsuarios =this.listaUsuarios.filter(data => {
    return data.id.toString() !== usuario.toString(); 
  })
  localStorage.setItem("listaAgenda", JSON.stringify( this.listaUsuarios));
  this.cargarDatos();
}


 buscarUsuario(id: any): UsuarioDataI{
  //o retorna un json {} vacio
  return this.listaUsuarios.find(element => element.id === id) || {} as UsuarioDataI;
}

modificarUsuario(user: UsuarioDataI){
  this.cargarDatos();
  this.eliminarUsuario(user.id);
  this.agregarUsuario(user);
}


cargarDatos(){
  if (!localStorage.getItem("listaAgenda")) {
    
    console.log(this.listaUsuarios);
    localStorage.setItem("listaAgenda", JSON.stringify( this.listaUsuarios));
    let guardados = localStorage.getItem('listaAgenda');
    this.listaUsuarios = JSON.parse(guardados || '{}');
    console.log(this.listaUsuarios[0]);

  } else{
    
    //localStorage.setItem("listaAgenda", JSON.stringify( this.listUsuarios));
    let guardados = localStorage.getItem('listaAgenda');
    this.listaUsuarios = JSON.parse(guardados || '{}');
  }
}

}
