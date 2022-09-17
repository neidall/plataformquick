import { Component, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioDataI } from 'src/app/interfaces/usuario.interface';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dataSource!:  MatTableDataSource<any> ;

  option:boolean = false;

  displayedColumns: string[] = ['Usuario', 'Nombre',  'Chat'];
  listaUsuarios: any[] =[];
  activo : boolean = false;
  
  
  estadoLista!:boolean;
  radio= '';
  
 
  constructor(private serviceDataUsers : ProyectosService, private _snackbar :MatSnackBar, private router:Router) { 
 

    
  }
  
  ngOnInit(): void {
    this.serviceDataUsers.getAll('usuarios').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        this.listaUsuarios = listaDeUsuariosRef.map(proy => {
          
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()

          }
        })
        
      console.log(this.listaUsuarios);
   
      })
    })
   
  }
   





  



  activarComponenteChat(){
    this.option = true;
        
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
}
