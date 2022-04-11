import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunModule } from '../comun/comun.module';
import { CoreModule } from '../core/core.module';
import { FormularioScmComponent } from './components/formulario-scm/formulario-scm.component';
import { ScmComponent } from './components/scm/scm.component';
import { ScmPermisosComponent } from './components/scm-permisos/scm-permisos.component';



@NgModule({
  declarations: [
    FormularioScmComponent,
    ScmComponent,
    ScmPermisosComponent
  ],
  imports: [
    CommonModule,
    ComunModule,
    CoreModule
  ]
})
export class ScmModule { }
