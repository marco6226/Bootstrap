import { UsuarioComponent } from './../../../admin/components/usuario/usuario.component';
import { InicioComponent } from './../inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { PerfilComponent } from 'src/app/modulos/admin/components/perfil/perfil.component';
import { AdminModule } from './../../../admin/admin.module';
import { PermisosComponent } from 'src/app/modulos/admin/components/permisos/permisos.component';
import { LoginComponent } from '../login/login.component';
import { FormularioScmComponent } from 'src/app/modulos/scm/components/formulario-scm/formulario-scm.component';
import { ScmComponent } from 'src/app/modulos/scm/components/scm/scm.component';
import { ScmPermisosComponent } from 'src/app/modulos/scm/components/scm-permisos/scm-permisos.component';
import { ScmModule } from 'src/app/modulos/scm/scm.module';
import { CargarArchivoComponent } from 'src/app/modulos/rai/components/cargar-archivo/cargar-archivo.component';
import { RegistroReportesComponent } from 'src/app/modulos/rai/components/registro-reportes/registro-reportes.component';
import { ConsultaReportesComponent } from 'src/app/modulos/rai/components/consulta-reportes/consulta-reportes.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {path: 'login', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'app',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home', 
        component: InicioComponent,
        canActivate: [AuthGuardService],
      },
    {
      path: 'admin',
      canActivate: [AuthGuardService],
      children: [
        {
          path: 'perfil',
          component: PerfilComponent,
          
        },
        {
          path: 'permisos',
          component: PermisosComponent
        },
        {
          path: 'usuario',
          component: UsuarioComponent
        },
      ]
    },
    {
      path: 'scm',
      canActivate: [AuthGuardService],
      children: [
        {
          path: 'creacion',
          component: FormularioScmComponent,
          
        },
        {
          path: 'list',
          component: ScmComponent
        },
        {
          path: 'permisos',
          component: ScmPermisosComponent
        },
      ]
    },
    {
      path: 'rai',
      canActivate: [AuthGuardService],
      children: [
        {
          path: 'cargaArchivo',
          component: CargarArchivoComponent,
          
        },
        {
          path: 'registroReporte',
          component: RegistroReportesComponent
        },
        {
          path: 'consultaReportes',
          component: ConsultaReportesComponent
        },
      ]
    }
    ]
  },
  // { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdminModule,    
    // ScmModule
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
