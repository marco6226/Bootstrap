import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../../auth-guard.service';
import { AuthService } from '../../auth.service';
import {MessageService} from 'primeng/api';
import { MensajeUsuario } from '../../entities/mensaje-usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  @Input("modal") modal: boolean = false;
  @Input("visible") visible: boolean = true;
  subscription: Subscription;
  formLogin: FormGroup;
  typePassword = 'password';
  logueando: boolean=false;
  msgs: MessageService[] = [];

  contadorFallas = 0;
  visiblePinForm = false;
  intentosMax = 5;
  relojText: string | undefined;

  version: any;


  constructor(
    private messageService: MessageService,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
		private AuthGuardService: AuthGuardService,
    private snackBar: MatSnackBar,
    private sesionService: SesionService,
    private activateRoute: ActivatedRoute,
  ) { 
    this.subscription = this.authService.getLoginObservable().subscribe(visible => this.setVisible(visible));
    this.formLogin = fb.group({
      'correo': [null, Validators.required],
      'password': [null, Validators.required],
      'pin': [null],
      'recordar': [true]
    });
  }

  setVisible(visible: boolean) {
    // this.msgs = [];
    this.messageService.add({severity:'warn', summary: 'pro', detail: 'Se cerro su sesion inicie de nuevo por favor'});
    this.visible = visible;
  }

  ngOnInit(): void {
    this.version = this.sesionService.getAppVersion();
        this.activateRoute.queryParams
            .subscribe(params => {
                console.log(params)
                // if (params.redirect) {
                //     localStorage.setItem('url', params.redirect);
                // }


            })
        this.typePassword = 'password';
        if (this.sesionService.getEmpresa() != null && this.sesionService.getUsuario() != null) {
            this.router.navigate([this.authService.redirectUrl]);
        } else {
            let countDown = Number(localStorage.getItem('countDown'));
            if (countDown != null && countDown > 0) {
                this.contadorFallas = 5;
                this.iniciarContador(countDown);
            }
        }
  }

  showPSW(){
    if (this.typePassword === 'password') {
      this.typePassword = 'text';      
    } else {
        this.typePassword = 'password';           
    }
  }

  onLogin(){
    console.log("si")
    this.logueando = true;
    this.authService.login(this.formLogin.value.correo, this.formLogin.value.password, this.formLogin.value.recordar, this.formLogin.value.pin)
      .then((res: any) => {
        let aceptaTerm = this.authService.sesionService.getUsuario()?.fechaAceptaTerminos != null;
        // this.logueando = false;
        // this.visible = false;
        if (this.modal) {
            this.authService.onLogin(res);
        } else {
          let url = this.AuthGuardService.Geturl();
          this.router.navigate([(aceptaTerm ? url : '/app/terminos')]);
          this.AuthGuardService.Seturl('/app/home');
          }
    }).catch(      
        err => {
            this.logueando = false;
            this.msgs = [];
            if (err['name'] != null && err['name'] == 'TimeoutError') {
                this.messageService.add({severity:'warn', summary: 'CONEXIÓN DEFICIENTE', detail: 'La conexión está tardando mucho tiempo en responder, la solicitud ha sido cancelada. Por favor intente mas tarde.'});
                // this.msgs.push({ severity: 'warn', summary: 'CONEXIÓN DEFICIENTE', detail: 'La conexión está tardando mucho tiempo en responder, la solicitud ha sido cancelada. Por favor intente mas tarde.' });
                return;
            }
            let msg: MensajeUsuario = err.error;
            switch (err.status) {
                case 403:
                    this.messageService.add({severity:'error', summary: 'CREDENCIALES INCORRECTAS', detail: 'El usuario o contraseña especificada no son correctas'});
                    // this.msgs.push({ severity: 'warn', summary: 'CREDENCIALES INCORRECTAS', detail: 'El usuario o contraseña especificada no son correctas' });
                    break;
                case 401:                        
                    if (msg.codigo == 2_007) {
                        this.visiblePinForm = true;
                    }
                    if (msg.codigo == 2_009) {
                        this.contadorFallas = this.intentosMax;
                    }
                    this.messageService.add({ severity: msg.tipoMensaje, summary: msg.mensaje, detail: msg.detalle });
                    break;
                case 400:
                    this.messageService.add({ severity: msg.tipoMensaje, summary: msg.mensaje, detail: msg.detalle });
                    break;
                default:
                    this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Se ha generado un error no esperado' });
                    break;
            }
            this.contadorFallas += 1;
            if (this.contadorFallas >= this.intentosMax) {
                this.iniciarContador(new Date().getTime() + (2 * 60 * 1000));
            }
        }
    );
  }

  iniciarContador(countDown: number) {
    localStorage.setItem('countDown', '' + countDown);
    let interval = window.setInterval(() => {
        let now = new Date().getTime();
        let distance = countDown - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.relojText = minutes + "m " + seconds + "s ";
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(interval);
            this.contadorFallas = 0;
            localStorage.removeItem('countDown');
        }
    }, 1000);
  }
}
