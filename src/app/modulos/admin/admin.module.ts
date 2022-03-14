import { UsuarioComponent } from './components/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { ComunModule } from '../comun/comun.module';
import { AuthService } from '../core/auth.service';
import { AuthGuardService } from '../core/auth-guard.service';


@NgModule({
  declarations: [
    AdminComponent,
    PerfilComponent,
    PermisosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComunModule
  ],
  providers: [
    // AuthGuardService,
    // AuthService,
  ]
})
export class AdminModule { }
