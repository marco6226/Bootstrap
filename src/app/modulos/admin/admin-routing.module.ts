import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';
import { AdminComponent } from './admin.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [{ 
  path: 'admin', 
  // component: AdminComponent,
  // canActivate: [AuthGuardService],
  children:[
    {path: 'perfil', component: PerfilComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
