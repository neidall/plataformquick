import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;


  constructor(private fb: FormBuilder , private _snackbar: MatSnackBar, private router: Router) {
    this.formularioLogin();
   }

  ngOnInit(): void {
  }

  formularioLogin(): void {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['quick123', Validators.required]
    });
  }

  Ingresar(): void{
    console.log(this.form.value);

    const Usuario: UsuarioI = {
      usuario: this.form.value.usuario,
      password: this.form.value.password,
    }

    console.log(Usuario);

    if(Usuario.usuario === 'quick' && Usuario.password === 'quick123'){
      this.fakeLoading();
    } else {
      this.error()
      this.form.reset();
    }

  }
  error(): void{
    this._snackbar.open('usuario o contraseÃ±a incorrecto', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
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





}
