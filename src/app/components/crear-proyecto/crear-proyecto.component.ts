import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  form!:FormGroup;
  listUsers : any[]=[];
  uidUser:any; 

  toppingList: string[] = ['Sergio Paredes', 'Madai Gutierrez', 'Carla Salazar', 'Pedro Torrez', 'Laura Soruco'];
  constructor(private fb:FormBuilder, 
              private authService : AuthService,
              private router:Router,
              private serviceDB: ProyectosService) {
    this.cargarForm();
   }

  ngOnInit(): void {

    this.authService.getUserLoged().subscribe(res =>{

      if (res) {
        console.log('usuario logueago');        
        // this.logeado = true;
        this.getDatosUser(res.uid);
        console.log(res.uid);
        
      }
      else{
        console.log('usuario no logeado');
        // this.logeado = false;
      }
    }) 

    this.serviceDB.getAll('usuarios').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        this.listUsers = listaDeUsuariosRef.map(proy => {
          return {
            id: proy.payload.doc.id,
            data: proy.payload.doc.data()
          }
        })
        // this.auxitems = listaDeUsuariosRef.map(proy => {
        //   return {
        //     id: proy.payload.doc.id,
        //     data: proy.payload.doc.data()
        //   }
        // })

      })
    })
  }


  getDatosUser(uid : any){
    const path = "usuarios";
    this.uidUser = uid;
    const id = uid;
    this.serviceDB.getDoc<UsuarioI>(path, id).subscribe(res=>{
     console.log( "el res es = " , res);
     if (res){
      // this.nombre =  res.nombre,
      // this.rol = res.cargo
   
      console.log(res.cargo);
      
     } {
       
     }  
    })
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
    let idProyecto:any;
    let listIdObjt:any[]=[];
    let listIntegrantes:string []=[];
    let listIntegrantesPrueba:any []=[];
    let listObj:string []=[];

    for (let i = 0; i < this.getObjetivos.length; i++) {

      listObj.push(this.getObjetivos.at(i).get('objetivo')?.value);
      for (let j = 0; j < this.getObjetivos.at(i).get('integrants')?.value.length; j++) {
        
        listIntegrantes = listIntegrantes.concat(this.getObjetivos.at(i).get('integrants')?.value[j].data.nombre);
        listIntegrantesPrueba.push({
                                    id:listIntegrantesPrueba.concat(this.getObjetivos.at(i).get('integrants')?.value[j].id,),
                                    nombre:listIntegrantesPrueba.concat(this.getObjetivos.at(i).get('integrants')?.value[j].data.nombre,)
                                  })
      }

    }
  
    const proyecto:any ={
      // idUsuario:    this.uidUser,
      nombre:       this.form.value.nombre,
      responsable:  {
                      id:     this.form.value.responsable.id,
                      nombre: this.form.value.responsable.data.nombre
                    },
      estado:       "Pendiente",
      avance:       0,
      objetivos:    listObj,
      integrantes:  listIntegrantes.filter(function(ele , pos){
                      return listIntegrantes.indexOf(ele) == pos;
                    }),
      fechaCreacion:new Date(),
      fechaLimite:  this.form.value.fecha,
    }


    console.log(proyecto);
    
    this.serviceDB.create('items',proyecto).then(async (res) =>{
      idProyecto =  await res?.id;
      console.log(idProyecto);
      console.log('empleado anadido excelentemente',res?.id);

      for (let i = 0; i < this.getObjetivos.length; i++) {
        let nuevo:any = {
          idProyecto,
          objetivo : this.getObjetivos.at(i).get('objetivo')?.value,
          integrantes : [],
          fecha : this.getObjetivos.at(i).get('fechao')?.value,
        } 

        for (let j = 0; j < this.getObjetivos.at(i).get('integrants')?.value.length; j++) {
          
          nuevo.integrantes.push({
                                  id:this.getObjetivos.at(i).get('integrants')?.value[j].id,
                                  nombre: this.getObjetivos.at(i).get('integrants')?.value[j].data.nombre
                                })
        }

        this.serviceDB.create('objetivos', nuevo).then(async (res) =>{
          console.log(await res?.id);
        }).catch(err => {
          console.log(err);
        })

      }
    }).catch(error => {
      console.log(error);
    })
    

    this.router.navigate(['/proyectos']);
    console.log(this.form);


  }
}