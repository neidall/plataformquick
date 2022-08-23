import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit {
  displayedColumns: string[] = ['fechaHora', 'concepto', 'integrantes','enlace'];
  reuniones:any[]=[];
  dataSource;
  constructor(private serviceData: ProyectosService) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    console.log(this.serviceData.getAll('reuniones'));
    
    this.serviceData.getAll('reuniones').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        this.reuniones = listaDeUsuariosRef.map(proy => {
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
        console.log(this.reuniones[0].data);

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
