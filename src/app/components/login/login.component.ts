import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
 


  constructor(private fb: FormBuilder , private _snackbar: MatSnackBar, private router: Router, private authservice : AuthService) {
    this.formularioLogin();
   }

  ngOnInit(): void {
  }


  formularioLogin(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  Ingresar(): void{
    console.log(this.form.value);
        this.authservice.login( this.form.value.email, this.form.value.password).then(res =>{
        console.log('se registro',res);

        if(res !== null){ 
          this.fakeLoading();
        }else{
            this.error()
            this.form.reset();
          }

          if(this.form.value.email === 'quick@gmail.com' && this.form.value.password ==='quick123'){ 
            this.fakeLoadingAdmi();
          } 
      
        
      })

  }



  error(): void{
    this._snackbar.open('usuario o contraseña incorrecto', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      
    });
  }



  fakeLoading(): void {
    this.loading = true;
      //Redireccionamos al inicio
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['inicio']);
    }, 1000);
  }

  fakeLoadingAdmi(): void {
    this.loading = true;
      //Redireccionamos al inicio
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['admiQuicK']);
    }, 1000);
  }



  logout(){
        this.authservice.logout();
        this.router.navigate(['login']);
  }

}
