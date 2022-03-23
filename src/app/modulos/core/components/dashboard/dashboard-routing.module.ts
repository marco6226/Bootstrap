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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {path: 'login', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'app',
    component: DashboardComponent,
    children: [
      {
        path: 'home', 
        component: InicioComponent,
        canActivate: [AuthGuardService],
      },
      // { 
      //   path: 'admin', 
      //   loadChildren: () => import('../../../admin/admin.module').then(m => m.AdminModule),
      //   canActivate: [AuthGuardService] 
      // },
    // {
    //   path: 'admin/perfil',
    //   component: PerfilComponent,
    //   canActivate: [AuthGuardService]
    // }
    {
      path: 'admin',
      children: [
        {
          path: 'perfil',
          component: PerfilComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'permisos',
          component: PermisosComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'usuario',
          component: UsuarioComponent,
          canActivate: [AuthGuardService]
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
    AdminModule
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
