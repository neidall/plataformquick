import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  form!:FormGroup;

  toppingList: string[] = ['Sergio Paredes', 'Madai Gutierrez', 'Carla Salazar', 'Pedro Torrez', 'Laura Soruco'];
  constructor(private fb:FormBuilder, 
              private router:Router,
              private serviceProy: ProyectosService) {
    this.cargarForm();
   }

  ngOnInit(): void {
  }

  get getObjetivos(){
    return  this.form.get('objetivos') as FormArray;
  }

  cargarForm(){
    this.form = this.fb.group({
      nombre:['',[Validators.required,Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
      responsable:new FormControl('',Validators.required),
      objetivos: this.fb.array([]),
      fecha:['',[Validators.required]],
    })
    
    this.getObjetivos.push(this.fb.group({
      objetivo: ['',[Validators.required]],
      integrants : new FormControl('',Validators.required),
      fechao:['',[Validators.required]],
    }))
  }


  addObject():void{
     const nuevo = this.fb.group({
       objetivo: ['',[Validators.required]],
       integrants : new FormControl('',Validators.required),
       fechao:['',[Validators.required]],
     })

     this.getObjetivos.insert(0,nuevo);
    console.log('pasa por aca addOb');
    
  }



  removeObjetivo(id:any){
    this.getObjetivos.removeAt(id);
  }


  guardar(){
    if(this.form.invalid){
      return;
    }
    let listObjs:any []=[];
    let listObj:string []=[];

    for (let i = 0; i < this.getObjetivos.length; i++) {
      const nuevo:any = {
        objetivo : this.getObjetivos.at(i).get('objetivo')?.value,
        integrantes : this.getObjetivos.at(i).get('integrants')?.value,
        fecha : this.getObjetivos.at(i).get('fechao')?.value,
      } 

      listObjs.push(nuevo);

      // this.serviceProy.create('objetivos', nuevo).then(async res =>{
      //   let dir = await res?.path;
      //   listObjs.push(dir as string);
      // }).catch(err => {
      //   console.log(err);
        
      // })
    }

    console.log(listObjs);
    
    for (let j = 0; j < this.getObjetivos.length; j++) {
      listObj.push(this.getObjetivos.at(j).get('objetivo')?.value);
    }

    const proyecto:any ={
      nombre:this.form.value.nombre,
      responsable: this.form.value.responsable,
      integrantes: this.form.value.integrantes,
      avance:0,
      objetivos: listObjs,
      fecha:this.form.value.fecha,
      tareas:listObj
    }

    
    console.log(proyecto);
    
    
    this.serviceProy.create('items',proyecto).then(() =>{
      console.log('empleado anadido excelentemente');
    }).catch(error => {
      console.log(error);
    
    })
    this.router.navigate(['/proyectos']);
    console.log(this.form);

  }
}
