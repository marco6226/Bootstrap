import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ComunModule } from 'src/app/modulos/comun/comun.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ScmModule } from 'src/app/modulos/scm/scm.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavBarComponent,
    MenuBarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComunModule,
    // ScmModule
  ]
})
export class DashboardModule { }
