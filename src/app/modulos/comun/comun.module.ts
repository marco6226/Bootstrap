import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule
  ],
  exports: [
    MaterialModule,
    PrimengModule
  ]
})
export class ComunModule { }
