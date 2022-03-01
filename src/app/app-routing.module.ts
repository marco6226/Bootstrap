import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './modulos/core/core.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/core/components/login/login.component';
import { AuthGuardService } from './modulos/core/auth-guard.service';
import { InicioComponent } from './modulos/core/components/inicio/inicio.component';
import { HomeComponent } from './modulos/core/components/home/home.component';
import { DashboardModule } from './modulos/core/components/dashboard/dashboard.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'modulos/empresa', loadChildren: () => import('./modulos/empresa/empresa.module').then(m => m.EmpresaModule)},
  { path: 'app', loadChildren: () => import('./modulos/core/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreModule,
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
