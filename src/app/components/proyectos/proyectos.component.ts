import { NgIfContext } from '@angular/common';
import { Component, OnInit, ViewChild, ɵgetUnknownElementStrictMode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProyectoI, UsuarioI } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})



export class ProyectosComponent implements OnInit {

  opcions:string[] = ['Ver todo','Pendientes','Terminados']
  // items:any []=[];
  // items1:any []=[];
  objetivos:any []=[];
  // auxobjetivos:any []=[];
  disableSelect = new FormControl(false);
  dataSource;
  
  proyectos:any[]=[];
  auxproyectos:any []=[];
  uidUser:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private serviceDB:ProyectosService, private authService : AuthService) { 
    this.dataSource = new MatTableDataSource();
    
  }

  ngOnInit(): void {
    //-------------UsuarioGlobal----------------------
    this.authService.getUserLoged().subscribe(res =>{

      if (res) {
        // console.log('usuario logueago');        
        // this.logeado = true;
        this.getDatosUser(res.uid);
        // console.log(res.uid);
      }
      else{
        // console.log('usuario no logeado');
        // this.logeado = false;
      }
    })

    //----------Proyectos-------------------
    this.serviceDB.getAll('items').then(firebaseResponse => {
      firebaseResponse?.subscribe(listaDeUsuariosRef => {

        this.proyectos = listaDeUsuariosRef.map(proy => {
          let data:any = proy.payload.doc.data(); 
          return {
            id:proy.payload.doc.id,
            nombre:data.nombre,
            responsable:data.responsable,
            estado: data.estado,
            avance:data.avance,
            fechaCreacion : data.fechaCreacion,
            fechaLimite : data.fechaLimite,
            listObjetivos:[]
          }
        })

        //--------Proy------Objetivos------------
        this.serviceDB.getAll('objetivos').then(firebaseResponse => {
          firebaseResponse?.subscribe(listaDeUsuariosRef => {
    
            this.objetivos = listaDeUsuariosRef.map(proy => {
              let data:any = proy.payload.doc.data();
              return {
                id:         proy.payload.doc.id,
                idProyecto: data.idProyecto,
                objetivo:   data.objetivo,
                integrantes:data.integrantes,
                fechaLimite:data.fecha
              }
            })

            //------------Lista Oficial------------
            this.proyectos.forEach((item) =>{
              item.listObjetivos = this.objetivos.filter((elem)=>{
                  return item.id == elem.idProyecto;
              })
            })
            //-------Filtrando los datos del usuario Logueado || user actual || user active
            this.proyectos = this.proyectos.filter((proy) =>{
              if (proy.responsable.id === this.uidUser ) {
                return proy;
              }
              else {
                let objetivo =  proy.listObjetivos.find((e: any) => {
                  let rep = e.integrantes.find((inte: any) => {
                    return inte.id === this.uidUser;
                  })
                    console.log(rep);
                    
                  if (rep!=null) {
                    return e;
                  }
                }) 

                if (objetivo!=null) {
                  return proy;
                }

              }
            })

           
            console.log('esta es la lista  oficial',this.proyectos);
            this.auxproyectos = this.proyectos;
          })
        })

      })
    })


    //--------------------Objetos------------------
    // this.serviceDB.getAll('objetivos').then(firebaseResponse => {
    //   firebaseResponse?.subscribe(listaDeUsuariosRef => {

    //     this.objetivos = listaDeUsuariosRef.map(proy => {
    //       return {
    //         id: proy.payload.doc.id,
    //         data: proy.payload.doc.data()
    //       }
    //     })
    //     // console.log(this.items[0].data.nombre);
    //   })
    // })

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

  agregarAlista(){
   
  }

  ver(num:number,element:any){
    switch (num) {
      case 0:
        //nombre
        this.proyectos = this.auxproyectos.filter((elem) => elem.id === element.id);
      break;
      case 1:
        //responsable
        this.proyectos = this.auxproyectos.filter((elem) => elem.data.responsable === element.data.responsable);
        break;
      case 2:
        //Objetivos
        this.proyectos = this.auxproyectos.filter((elem) => elem.data.objetivos === element.data.objetivos);
      break;
      case 3:
        //Integrantes
        this.proyectos = this.auxproyectos.filter((elem) => elem.data.integrantes === element.data.integrantes);
      break;
      case 4:
        //Avance
        console.log(element);
        this.proyectos = this.auxproyectos.filter((elem) => elem.data.avance === element);
      break;
      case 5:
        //FechaLimite
        this.proyectos = this.auxproyectos.filter((elem) => elem.data.fechaLimite === element);
      break;
    }
  }

  verPor(opt:number){
    console.log(this.proyectos ,this.auxproyectos);
    
    switch (opt) {
      case 0:
        this.proyectos = this.auxproyectos;
      break;
      case 1:
        this.proyectos = this.auxproyectos.filter((elem) => elem.data.estado === "Pendiente");
      break;
      default:
        this.proyectos = this.auxproyectos.filter((elem) =>elem.data.estado === "Terminado");
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  datos(){
    this.serviceDB.getAll('items').then(firebaseResponse => {
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