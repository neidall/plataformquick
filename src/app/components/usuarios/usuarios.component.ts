import { Component, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dataSource!:  MatTableDataSource<any> ;

  option:boolean = false;
  
 
  activarComponente(){
    this.option = true;
        
  }
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
}
