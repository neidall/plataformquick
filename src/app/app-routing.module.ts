import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmiquickComponent } from './components/admiquick/admiquick.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { CrearReunionComponent } from './components/crear-reunion/crear-reunion.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { QuickdashComponent } from './components/quickdash/quickdash.component';
import { ReunionesComponent } from './components/reuniones/reuniones.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { VerProyectoComponent } from './components/ver-proyecto/ver-proyecto.component';

const routes: Routes = [
  // {path:'',component: QuickdashComponent},
  {path:'',component: LoginComponent}, 
  {path:'login',component: LoginComponent},
  {path:'inicio',component: InicioComponent},
  {path:'admiQuicK',component: AdmiquickComponent},
  {path:'crear-usuario',component: CrearUsuarioComponent},
  {path:'proyectos',component: ProyectosComponent},
  {path:'crear-proyecto',component: CrearProyectoComponent},
  {path:'ver-proyecto',component: VerProyectoComponent},
  {path:'tareas',component: TareasComponent},
  {path:'crear-tarea',component: CrearTareaComponent},
  {path:'reuniones',component: ReunionesComponent},
  {path:'crear-reunion',component: CrearReunionComponent},
  {path: '**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
