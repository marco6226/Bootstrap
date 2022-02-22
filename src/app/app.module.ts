import { MessageService } from 'primeng/api';
import { HttpInt } from 'src/app/httpInt';
import { LoginComponent } from './modulos/core/components/login/login.component';
import { ComunModule } from './modulos/comun/comun.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentoFormComponent } from './modulos/ado/components/documento-form/documento-form.component';
import { DocumentoSelectorComponent } from './modulos/ado/components/documento-selector/documento-selector.component';
import { DocumentoUploadComponent } from './modulos/ado/components/documento-upload/documento-upload.component';
import { GestionDocumentalComponent } from './modulos/ado/components/gestion-documental/gestion-documental.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './modulos/core/services/http-auth.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentoFormComponent,
    DocumentoSelectorComponent,
    DocumentoUploadComponent,
    GestionDocumentalComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComunModule,
    HttpClientModule
  ],
  providers: [
    HttpInt,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpAuthInterceptor,
        multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
