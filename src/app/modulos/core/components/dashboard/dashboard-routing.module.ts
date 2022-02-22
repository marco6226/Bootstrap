import { InicioComponent } from './../inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
      path: 'home', 
      component: InicioComponent,
      canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
