import { endPoints } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInt } from 'src/app/httpInt';
import { MensajeUsuarioService } from '../../comun/services/mensaje-usuario.service';
import { ServiceCRUD } from '../../core/services/service-crud.service';
import { SesionService } from '../../core/services/sesion.service';
import { Empleado } from '../entities/empleado copy';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends ServiceCRUD<Empleado> {
  // override httpInt!: HttpInt;
  headers: any;

  constructor(
    httpInt: HttpInt,
    mensajeUsuarioService: MensajeUsuarioService,
    private http: HttpClient,
    public sesionService: SesionService,
  ) {
    super(httpInt, mensajeUsuarioService)
  }

  getClassName(): string {
    return "EmpleadoService";
  }
  /**
   * Modifica los datos de usuario por parte del mismo empleado.
   * No es permitido que un usuario modifique datos de otro a través
   * éste servicio
   * @param entity 
   */
  edit(entity: Empleado) {
    let body = JSON.stringify(entity);
    return new Promise(resolve => {
      this.httpInt.put(this.end_point + 'update', body)
        .subscribe(
          res => {
            resolve(res);
          }
          ,
          err => this.manageError(err)
        )
    });
  }
  
  loadAll(list: Empleado[]) {
    let body = JSON.stringify(list);
    return new Promise(resolve => {
      this.httpInt.put(this.end_point + "loadAll", body)
        .subscribe(
          res => {
            resolve(res);
          }
          ,
          err => this.manageError(err)
        )
    });
  }

  buscar(parametro: string) {
    return new Promise(resolve => {
      this.httpInt.get(endPoints.EmpleadoService + "buscar/" + parametro)
        .subscribe(
          res => {
            resolve(res);
          }
          ,
          err => this.manageError(err)
        )
    });
  }

  findempleadoByUsuario(parametro: string | null | undefined) {
    return new Promise(resolve => {
      this.httpInt.get(endPoints.EmpleadoService + "buscarempleado/" + parametro)
        .subscribe(
          res => {
            resolve(res);
          }
          ,
          err => this.manageError(err)
        )
    });
  }
  
  public getFirma(empleado_id: any) {
    return this.http.get(`${this.end_point}images/${empleado_id}`, this.getRequestHeaders(this.headers)).toPromise();
  }

  getRequestHeaders(headers?: HttpHeaders): any {
    if (headers == null)
        headers = new HttpHeaders().set('Content-Type', 'application/json');

    headers = headers
        .set('Param-Emp', this.sesionService.getParamEmp())
        .set('app-version', this.sesionService.getAppVersion())
        .set('Authorization', this.sesionService.getBearerAuthToken());
    return { 'headers': headers };
}
}
