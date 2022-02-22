import { HttpInt } from './../../httpInt';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { endPoints } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { SesionService } from './services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubject = new Subject<any>();
  authEndPoint = endPoints.auth;
  private loginSubmitSubject = new Subject<any>();
  redirectUrl: string = "/app/home";

  constructor(
    public httpInt: HttpInt,
    public sesionService: SesionService,
  ) { }

  public isLoggedIn(): boolean {
    return this.sesionService.isLoggedIn();
  }

  /**
     *  Devuelve el observable que indica cuando visualizar el formulario de login
     */
   getLoginObservable(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  checkisLoginExist(login: string, passwd: string) {
    let body = login + ":" + this.createHash(passwd);
    return this.httpInt
        .post(
            this.authEndPoint +
                "activetokens" +
                "?r=" +
                false +
                (false != null ? "&pin=" + false : ""),
            body
        )
  }

  /**
     * Genera un hash SHA-256 de la cadena de texto recibida como parametro
     * @param passw
     */
   createHash(value: string) {
    try {
        return CryptoJS.SHA256(value);
    } catch (e) {
        //console.log(e);
        return "";
    }
  }

  login(login: string, passwd: string, recordar: boolean, pin: string){
    let body = login + ":" + this.createHash(passwd);
    return new Promise((resolve, reject)=>{
      this.httpInt.post(this.authEndPoint + "?r=" + recordar + (pin != null ? "&pin=" + pin : ""), body)
        .subscribe(
          (res)=>{
            this.setSession(res, recordar);
            resolve(res);
          },
          (err)=> reject(err)
        )
    });
  }

  setSession(res: any, recordar?: boolean) {
    this.sesionService.setLoggedIn(true);
    this.sesionService.setUsuario(res["usuario"]);
    this.sesionService.setAuthToken(res["Authorization"]);
    if (recordar != null && recordar == true && res["refresh"] != null) {
        this.sesionService.setRefreshToken(res["refresh"]);
    }  
  }

  onLogin(res: any) {
    this.loginSubmitSubject.next(res);
  }

  logout() {
    let refresh = this.sesionService.getRefreshToken();
    let auth = this.sesionService.getAuthToken();
    return new Promise((resolve, reject) => {
        this.httpInt
            .post(this.authEndPoint + "logout", {
                refresh: refresh,
                Authorization: auth,
            }).subscribe(res =>{
              resolve(res)
            }),
            ((err: any)=>{
              reject(err)
            })
    });
  }

  resetPasswd(email: string) {
    return new Promise((resolve, reject) => {
        this.httpInt
            .get(this.authEndPoint + "recuperarPasswd/" + email).subscribe(res =>{
              resolve(res)
            }),
            ((err: any)=>{
              reject(err)
            })
    });
  }

  sendNotification(email: string, tarea:any) {
    let body = tarea;
    let endpoint = this.authEndPoint + "enviarCorreo/" + email;
    return new Promise((resolve, reject) => {
        this.httpInt
            .post(endpoint, body).subscribe(res =>{
              resolve(res)
            }),
            ((err: any)=>{
              reject(err)
            })
    });
    console.log(email);
  }

  sendNotificationObservacionDenegada(email: string, observacion:any) {
      console.log("Enviar notificacion a: (" + email + ")");
      let body = observacion;
      let endpoint = this.authEndPoint + "enviarCorreoDenegada/" + email;
      return new Promise((resolve, reject) => {
          this.httpInt
              .post(endpoint, body).subscribe(res =>{
                resolve(res)
              }),
              ((err: any)=>{
                reject(err)
              })
          console.log("Enviada a:" + email);
      });
  }

  sendNotificationhallazgosCriticos(id:any, nocumplecriticos:any,numeroeconomico:any,ubicacion:any) {
      let body = nocumplecriticos;
      let endPoint = this.authEndPoint + 'enviarHallazgosCriticos/' + id + '/' + numeroeconomico  + '/' + ubicacion;
      return new Promise((resolve) => {
          this.httpInt
              .post(endPoint , body)
              // .map((res) => res)
              .subscribe(
                  (res) => {
                      resolve(res);
                  },
                // (err) => this.manageError(err)
              );
      });
  }


  requestRefresh(token: string) {
      let body = token;
      console.log("paso por aca");
      let endpoint = this.authEndPoint + "refrescarToken";
      return new Promise((resolve, reject) => {
          this.httpInt
              .post(endpoint, body).subscribe(res =>{
                resolve(res)
              }),
              ((err: any)=>{
                reject(err)
              })
      });
  }
  
  /**
   * Método que intenta solicitar un nuevo token si se poseen las credenciales para hacerlo, si no,
   * emite un evento para visualizar el formulario de login para solicitar el ingreso al usuario
   */
  refreshToken(): Observable<any> {
      // Verifica si se posee el refresh_token para refrescar el token de acceso
      let refreshToken = this.sesionService.getRefreshToken();
      if (refreshToken != null && refreshToken != "undefined") {
          this.requestRefresh(refreshToken)
              .then((resp) => this.onLogin(resp))
              .catch((error) => {
                  this.setLoginFormVisible(true);
              });
              this.logout();

          return this.loginSubmitSubject.asObservable();
      } else {
          // Si no se posee passwd, visualiza el formulario de login
          this.setLoginFormVisible(true);
          return this.loginSubmitSubject.asObservable();
      }
  }

  /**
     * Emite el evento para visualizar o esconder el formulario de login
     * @param visible
     */
   setLoginFormVisible(visible: boolean) {
    this.loginSubject.next(visible);
  }
}
