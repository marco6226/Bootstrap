import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './modulos/core/core.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/core/components/login/login.component';
import { AuthGuardService } from './modulos/core/auth-guard.service';
import { AdminModule } from './modulos/admin/admin.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'modulos/empresa', loadChildren: () => import('./modulos/empresa/empresa.module').then(m => m.EmpresaModule)},
  { path: 'app', loadChildren: () => import('./modulos/core/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuardService]},
  // { path: 'modulos/admin', loadChildren: () => import('./modulos/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreModule,
    // AdminModule
  ],
  exports: [RouterModule],
  providers: [
    
  ]
})
export class AppRoutingModule { }
