import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargarArchivoComponent } from './components/cargar-archivo/cargar-archivo.component';
import { ConsultaReportesComponent } from './components/consulta-reportes/consulta-reportes.component';
import { RegistroReportesComponent } from './components/registro-reportes/registro-reportes.component';
import { FormularioAccidenteComponent } from './components/registroReportes/formulario-accidente/formulario-accidente.component';
import { FormularioIncidenteComponent } from './components/registroReportes/formulario-incidente/formulario-incidente.component';



@NgModule({
  declarations: [
    CargarArchivoComponent,
    ConsultaReportesComponent,
    RegistroReportesComponent,
    FormularioAccidenteComponent,
    FormularioIncidenteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RaiModule { }
