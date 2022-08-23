import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  displayedColumns: string[] = ['tarea', 'responsable', 'concepto','periodicidad', 'integrantes','importancia'];
  tareas: any[]=[];
  dataSource;
  constructor(private serviceData:ProyectosService) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    console.log(this.serviceData.getAll('tareas'));
    
    this.serviceData.getAll('tareas').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        this.tareas = listaDeUsuariosRef.map(proy => {
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
        console.log(this.tareas[0].data.nombre);

      })
    })
  }

  ver(item:any){
    console.log(item);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
