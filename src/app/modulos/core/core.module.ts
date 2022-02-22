import { DashboardModule } from './components/dashboard/dashboard.module';
import { ComunModule } from './../comun/comun.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { InicioComponent } from './components/inicio/inicio.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    TerminosCondicionesComponent,
    InicioComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ComunModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
  ]
})
export class CoreModule { }
