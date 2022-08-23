import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-crear-reunion',
  templateUrl: './crear-reunion.component.html',
  styleUrls: ['./crear-reunion.component.css']
})
export class CrearReunionComponent implements OnInit {

  form!:FormGroup;
  toppingList: string[] = ['Sergio Paredes', 'Madai Gutierrez', 'Carla Salazar', 'Pedro Torrez', 'Laura Soruco'];
  periodo: string[] = ['Mensual', 'Diariamente', 'Semanalmente'];
  constructor(private fb:FormBuilder, 
              private router:Router,
              private serviceDB: ProyectosService) { 
                this.cargarForm();
              }

  ngOnInit(): void {
  }

  cargarForm(){
    this.form = this.fb.group({
      fechaHora:['',[Validators.required]],
      concepto:['',Validators.required],
      integrantes:new FormControl('',Validators.required),
      link : ['',[Validators.required]],
    })
  }

  guardar(){
    if(this.form.invalid){
      return;
    }
    
    const reunion:any ={
      fechaHora:this.form.value.fechaHora,
      concepto: this.form.value.concepto,
      integrantes:this.form.value.integrantes,
      link: this.form.value.link,
    }
    
    this.serviceDB.create('reuniones',reunion).then(() =>{
      console.log('empleado anadido excelentemente');
    }).catch(error => {
      console.log(error);
    
    })
    this.router.navigate(['/reuniones']);
    console.log(this.form);

  }
}
