import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuickdashComponent } from './components/quickdash/quickdash.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { ReunionesComponent } from './components/reuniones/reuniones.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Angular Material
import {MatTableModule} from '@angular/material/table';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { VerProyectoComponent } from './components/ver-proyecto/ver-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickdashComponent,
    LoginComponent,
    InicioComponent,
    ProyectosComponent,
    TareasComponent,
    ReunionesComponent,
    NavbarComponent,
    CrearProyectoComponent,
    VerProyectoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
