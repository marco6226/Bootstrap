import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MensajeUsuario } from '../../core/entities/mensaje-usuario';

@Injectable({
  providedIn: 'root'
})
export class MensajeUsuarioService {

  private subject = new Subject<MensajeUsuario>();

  showMessage(message: MensajeUsuario) {
    this.subject.next(message);
  }

  // clearMessage() {
  //   this.subject.next();
  // }
  getMessage(): Observable<MensajeUsuario> {
    return this.subject.asObservable();
  }
}
