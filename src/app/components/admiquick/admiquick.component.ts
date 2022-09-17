import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioDataI } from 'src/app/interfaces/usuario.interface';
import { ProyectosService } from 'src/app/services/proyectos.service';


@Component({
  selector: 'app-admiquick',
  templateUrl: './admiquick.component.html',
  styleUrls: ['./admiquick.component.css']
})
export class AdmiquickComponent implements OnInit {
  
  displayedColumns: string[] = ['foto', 'nombre',  'estado', 'acciones'];
  usuarios: any[]=[];
  activo : boolean = false;
  
  dataSource;
  estadoLista!:boolean;
  radio= '';

    constructor(private serviceDataUsers : ProyectosService, private _snackbar :MatSnackBar, private router:Router) { 
      this.dataSource = new MatTableDataSource();

      
    }
  

  ngOnInit(): void {
    // console.log(this.serviceDataUsers.getAll('usuarios'));
    
    this.serviceDataUsers.getAll('usuarios').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {
        
        this.usuarios = listaDeUsuariosRef.map(proy => {
          
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
      //  console.log(this.usuarios[0].data.nombre);
      
      
      })
    })
        
  }

  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  cambio(valor:any):void{
    const opt = confirm("Esta seguro de cambiar el estado del usuario?");
    
    if (opt === true) {
      console.log("entro aca true");

      if (valor.data.estado === true) {
        let user = {
          cargo: valor.data.cargo,
          email: valor.data.email,
          foto: valor.data.foto,
          nombre: valor.data.nombre,
          password: valor.data.password,
          uid: valor.id,
          estado: false
        }
        this.serviceDataUsers.update("usuarios",valor.id,user).then(()=>{

        }).catch(()=> {

        })
      } else {
        let user = {
          cargo: valor.data.cargo,
          email: valor.data.email,
          foto: valor.data.foto,
          nombre: valor.data.nombre,
          password: valor.data.password,
          uid: valor.id,
          estado: true
        }
        this.serviceDataUsers.update("usuarios",valor.id,user).then(()=>{
         
        }).catch(()=> {
          
        })
      }
    } else {
      console.log("entro aca");
      
    }
  }
  
    }
  