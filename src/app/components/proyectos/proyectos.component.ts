import { Component, OnInit, ViewChild, ɵgetUnknownElementStrictMode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProyectoI } from 'src/app/interfaces/usuario.interface';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})



export class ProyectosComponent implements OnInit {

  displayedColumns: string[] = ['proyecto', 'responsable', 'objetivos', 'integrantes','avance','fechlimite'];
  opcions:string[] = ['Ver todo','Pendientes','Terminados']
  auxitems:any []=[];
  items:any []=[];
  disableSelect = new FormControl(false);
  dataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private serviceData:ProyectosService) { 
    this.dataSource = new MatTableDataSource();
    
  }

  ngOnInit(): void {
    console.log(this.serviceData.getAll('items'));
    
    this.serviceData.getAll('items').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        this.items = listaDeUsuariosRef.map(proy => {
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
        this.auxitems = listaDeUsuariosRef.map(proy => {
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
        // console.log(this.items[0].data.nombre);

      })
    })
  }

  agregarAlista(){
   
  }

  ver(num:number,element:any){
    switch (num) {
      case 0:
        //nombre
        this.items = this.auxitems.filter((elem) => elem.id === element.id);
      break;
      case 1:
        //responsable
        this.items = this.auxitems.filter((elem) => elem.data.responsable === element.data.responsable);
        break;
      case 2:
        //Objetivos
        this.items = this.auxitems.filter((elem) => elem.data.objetivos === element.data.objetivos);
      break;
      case 3:
        //Integrantes
        this.items = this.auxitems.filter((elem) => elem.data.integrantes === element.data.integrantes);
      break;
      case 4:
        //Avance
        console.log(element);
        this.items = this.auxitems.filter((elem) => elem.data.avance === element);
      break;
      case 5:
        //FechaLimite
        this.items = this.auxitems.filter((elem) => elem.data.fechaLimite === element);
      break;
    }
  }

  verPor(opt:number){
    let list = this.items;
    switch (opt) {
      case 0:
        this.items = this.auxitems;
      break;
      case 1:
        this.items = this.auxitems.filter((elem) => elem.data.estado === "Pendiente");
      break;
      default:
        this.items = this.auxitems.filter((elem) =>elem.data.estado === "Terminado");
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  datos(){
    this.serviceData.getAll('items').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        let listaDeUsuarios = listaDeUsuariosRef.map(proy => {
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
        console.log(listaDeUsuarios[0].data );

      })
    })
  }

}

