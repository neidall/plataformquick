import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  form!:FormGroup;

  toppingList: string[] = ['Sergio Paredes', 'Madai Gutierrez', 'Carla Salazar', 'Pedro Torrez', 'Laura Soruco'];
  periodo: string[] = ['Lunes','Martes','Miércoles','Jueves','Viernes','Mensual', 'Diariamente', 'Semanalmente'];
  importancia: string[] = ['Muy Alta', 'Alta', 'Media'];
  constructor(private fb:FormBuilder, 
              private router:Router,
              private _serviceDB: ProyectosService) { 
                this.cargarForm();
              }

  ngOnInit(): void {
  }

  
  cargarForm(){
    this.form = this.fb.group({
      nombre:['',[Validators.required]],
      responsable:['',[Validators.required]],
      concepto:['',Validators.required],
      periodicidad : ['',Validators.required],
      integrantes:new FormControl('',Validators.required),
      importancia :['',Validators.required]
    })
  }

  guardar(){
    if(this.form.invalid){
      return;
    }
    
    const tarea:any ={
      nombre:this.form.value.nombre,
      responsable: this.form.value.responsable,
      concepto: this.form.value.concepto,
      periodicidad: this.form.value.periodicidad,
      integrantes:this.form.value.integrantes,
      importancia:this.form.value.importancia,
      
    }
    
    console.log(tarea);
    
    
    this._serviceDB.create('tareas',tarea).then(() =>{
      console.log('tarea anadido excelentemente');
    }).catch(error => {
      console.log(error);
    
    })
    this.router.navigate(['/tareas']);
    console.log(this.form);

  }
}
