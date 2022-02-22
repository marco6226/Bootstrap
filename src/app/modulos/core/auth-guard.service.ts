import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  datourl= '/app/home'
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) return true;

    localStorage.setItem('url', url);
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // Navigate to the login page with extras
    //this.router.navigateByUrl('/app/sec/tarea/' + 1);
    this.datourl = url
    this.router.navigate(['/login']);
    
    return false;
  }

  Geturl (){        
    return this.datourl;
  }

  Seturl(url: string){        
      this.datourl = url;
  }
}
