import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PanelModule} from 'primeng/panel';

const modules = [
  ToastModule,
  BrowserAnimationsModule,
  ButtonModule,
  AvatarModule,
  AvatarGroupModule,
  MenubarModule,
  PanelMenuModule,
  BreadcrumbModule,
  MenuModule,
  ConfirmDialogModule,
  PanelModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports:[
    modules
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PrimengModule { }
