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
    return  this.form.get('listObjetivos') as FormArray;
  }

  cargarForm(){
    this.form = this.fb.group({
      nombre:['',[Validators.required]],
      responsable:new FormControl('',Validators.required),
      listObjetivos: this.fb.array([]),
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
    let listIntegrantes:string []=[];
    let listObj:string []=[];

    for (let i = 0; i < this.getObjetivos.length; i++) {
      const nuevo:any = {
        objetivo : this.getObjetivos.at(i).get('objetivo')?.value,
        integrantes : this.getObjetivos.at(i).get('integrants')?.value,
        fecha : this.getObjetivos.at(i).get('fechao')?.value,
      } 
      listObj.push(this.getObjetivos.at(i).get('objetivo')?.value);
      listIntegrantes = listIntegrantes.concat(this.getObjetivos.at(i).get('integrants')?.value);
      listObjs.push(nuevo);
      

      // this.serviceProy.create('objetivos', nuevo).then(async res =>{
      //   let dir = await res?.path;
      //   listObjs.push(dir as string);
      // }).catch(err => {
      //   console.log(err);
        
      // })
    }

    console.log(listObjs);
    console.log(listObj);
    console.log(listIntegrantes.filter(function(ele , pos){
      return listIntegrantes.indexOf(ele) == pos;
  }) );
  
    const proyecto:any ={
      nombre:this.form.value.nombre,
      responsable: this.form.value.responsable,
      integrantes: listIntegrantes.filter(function(ele , pos){
        return listIntegrantes.indexOf(ele) == pos;
    }),
      avance:0,
      listaObjetivos: listObjs,
      fechaCreacion: Date.now(),
      fechaLimite:this.form.value.fecha,
      objetivos:listObj,
      estado:"Pendiente"
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
