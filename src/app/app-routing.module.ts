import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { QuickdashComponent } from './components/quickdash/quickdash.component';
import { ReunionesComponent } from './components/reuniones/reuniones.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { VerProyectoComponent } from './components/ver-proyecto/ver-proyecto.component';

const routes: Routes = [
  {path:'',component: QuickdashComponent},
  {path:'iniciar-secion',component: LoginComponent},
  {path:'inicio',component: InicioComponent},
  {path:'proyectos',component: ProyectosComponent},
  {path:'crear-proyecto',component: CrearProyectoComponent},
  {path:'ver-proyecto',component: VerProyectoComponent},
  {path:'tareas',component: TareasComponent},
  {path:'reuniones',component: ReunionesComponent},
  {path: '**',redirectTo:'inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
