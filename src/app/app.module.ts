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

@NgModule({
  declarations: [
    AppComponent,
    QuickdashComponent,
    LoginComponent,
    InicioComponent,
    ProyectosComponent,
    TareasComponent,
    ReunionesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
