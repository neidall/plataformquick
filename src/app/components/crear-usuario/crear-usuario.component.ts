import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form!: FormGroup;
  loading: boolean = false;


  constructor(private fb: FormBuilder , private _snackbar: MatSnackBar, private router: Router, private authservice : AuthService, private crearUser: ProyectosService) {
    this.formularioRegisterUser();
   }

  ngOnInit(): void {
  }


  formularioRegisterUser(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
      nombre:['',[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
     
      
    });
  }


  async Registrar(): Promise<void>{

      const Usuario: UsuarioI = {
      uid: "",
      email: this.form.value.email,
      password: this.form.value.password,
      nombre: this.form.value.nombre,
      foto:"fotouser",
      estado: true,
      cargo: "usuario"
      }
      
      const res = await this.authservice.register(Usuario).catch(error =>{
      console.log(error);
      })

       if(res){

          console.log("exito al crear usuario");
          const path = "usuarios";
          const id = res.user?.uid;
          Usuario.uid = id;
          
         await this.crearUser.createDoc(Usuario,path,Usuario.uid)
         this._snackbar.open('exito al crear Usuario', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
         this.router.navigate(['/admiQuicK']);
        
      }else{
        this.error();
        }
      
        this.form.reset();


  }
 
  error(): void{
    this._snackbar.open('no se puede registrar usuario intente nuevamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    // this.router.navigate(['/crear-usuario']);
  }


  cambio(valor:any):void{
    console.log(valor);
 
       
  }

}
