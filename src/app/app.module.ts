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
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import {MatIcon, MatIconModule} from '@angular/material/icon';


//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { CrearReunionComponent } from './components/crear-reunion/crear-reunion.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdmiquickComponent } from './components/admiquick/admiquick.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { MatFormField } from '@angular/material/form-field';

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
    CrearTareaComponent,
    CrearReunionComponent,
    ChatComponent,
    AdmiquickComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSliderModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ChatComponent],

  // exports: [
  //   InicioComponent, 
  //   UsuariosComponent] 
})
export class AppModule {
 
  
}
