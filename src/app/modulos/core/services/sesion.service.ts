import { config } from './../../../config';
import { Injectable } from '@angular/core';
import { Session } from '../entities/session';
import { Empresa } from '../../empresa/entities/empresa';
import { Empleado } from '../../empresa/entities/empleado';
import { Usuario } from '../../empresa/entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private session!: Session;

  constructor() { }
  public isLoggedIn(): boolean{
    if (this.session == null) {
        this.session = <Session>JSON.parse(localStorage.getItem(config.session_id) || '{}');
        // if (this.session == null) return false;
        if(this.session.isLoggedIn){
          return true;
        }
        else if(!this.session.isLoggedIn || this.session.isLoggedIn == undefined || this.session.isLoggedIn == null){
          return false;
        }
    }
    // return this.session.isLoggedIn;
    return true;
  }

  public getAuthToken(): string {
    return localStorage.getItem(config.token_id) || '{}';
  }

  public getEmpresa(): Empresa | null | undefined{
    if (this.session == null) {
        this.session = <Session>JSON.parse(localStorage.getItem(config.session_id) || '{}');
        if (this.session == null) return null;
    }
    return this.session.empresa;
  }

  public setEmpresa(empresa: Empresa) {
    this.session.empresa = empresa;
    localStorage.setItem(config.session_id, JSON.stringify(this.session));
  }

  public getParamEmp(): string {
    let empParam = this.getEmpresa();
    return empParam == null ? '' : '' + empParam.id;
  }

  public getToken(): string | null | undefined{
    if (this.session == null) {
        this.session = <Session>JSON.parse(localStorage.getItem(config.session_id) || '');
        if (this.session == null) return null;
    }
    return this.session.token;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh') || '';
  }

  public setRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh', refreshToken);
  }

  public getBearerAuthToken(): string {
    let token = this.getAuthToken();
    return token == null ? '' : 'Bearer ' + token;
  }

  public setToken(token: string) {
    this.session.token = token;
    localStorage.setItem(config.session_id, JSON.stringify(this.session));
  }

  getAppVersion(): any {
    return "1.0.230";
  }

  public setLoggedIn(isLoggedIn: boolean) {
    if (isLoggedIn) {
        this.session = this.session == null ? new Session() : this.session;
        this.session.isLoggedIn = true;
        localStorage.setItem(config.session_id, JSON.stringify(this.session));
    } else {
        this.session == undefined;
        localStorage.removeItem(config.session_id);
        localStorage.removeItem('refresh');
        localStorage.removeItem(config.token_id);

    }
  }

  public getUsuario(): Usuario | null | undefined {
    if (this.session == null) {
        this.session = <Session>JSON.parse(localStorage.getItem(config.session_id) || '{}');
        if (this.session == null) return null;
    }
    return this.session.usuario;
  }

  public setUsuario(usuario: Usuario) {    
    this.session.usuario = usuario
    localStorage.setItem(config.session_id, JSON.stringify(this.session));
  }

  public setAuthToken(token: string) {
    localStorage.setItem(config.token_id, token);
  }

  public getConfigParam(codigo: string) {
    let map = this.getConfiguracionMap();
    if (map == null || this.getConfiguracionMap()[codigo] == null) {
        switch (codigo) {
            case 'APROB_INVEST_OBSERV': return 'true';
            case 'FORM_PART_INVST': return 'true';
            case 'FORM_COSTOS_INVST': return 'true';
            case 'NOMB_MOD_INP': return 'Inspecciones';
            case 'NOMB_MOD_AUC': return 'Observaciones';
            case 'NOMB_MOD_COP': return 'COPASST';
            case 'NOMB_MOD_SEC': return 'Seguimiento y control';
            case 'NOMB_MOD_IND': return 'Indicadores';
            case 'NUM_MAX_FOTO_INP': return '3';
        }
        return null;
    } else {
        return this.getConfiguracionMap()[codigo].valor;
    }
  }

  public getConfiguracionMap(): any {
    if (this.session == null) {
        this.session = <Session>JSON.parse(localStorage.getItem(config.session_id) || '{}');
        if (this.session == null) return null;
    }
    return this.session.configuracion;
  }

  public setConfiguracionMap(configMap: any) {
    this.session.configuracion = configMap;
    localStorage.setItem(config.session_id, JSON.stringify(this.session));
  }

  public getEmpleado(): Empleado | null | undefined{
    if (this.session == null) {
        this.session = <Session>JSON.parse(localStorage.getItem(config.session_id) || '');
        if (this.session == null) return null;
    }
    return this.session.empleado;
  }
  public setEmpleado(empleado: Empleado) {
      this.session.empleado = empleado;
      localStorage.setItem(config.session_id, JSON.stringify(this.session));
  }

  public setPermisosMap(permisosMapa: any) {
    this.session.permisosMap = permisosMapa;
    localStorage.setItem(config.session_id, JSON.stringify(this.session));
  }

  public getPermisosMap(): any {
      if (this.session == null) {
          this.session = <Session>JSON.parse(localStorage.getItem(config.session_id)||'');
          if (this.session == null) return null;
      }
      return this.session.permisosMap;
  }

}
