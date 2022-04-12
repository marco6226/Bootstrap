import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng.module';
import { TienePermisoDirective } from './directives/tiene-permiso.directive';



@NgModule({
  declarations: [
    TienePermisoDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
  ],
  exports: [
    MaterialModule,
    PrimengModule,
    TienePermisoDirective
  ]
})
export class ComunModule { }
