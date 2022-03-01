import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  ok(){
    const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
    const iconSidenav = document.getElementById('iconSidenav');
    const sidenav = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[1];
    let className = 'g-sidenav-pinned';

    // console.log("body", iconSidenav)
    if (body.classList.contains(className)) {
      body.classList.remove(className);
      setTimeout(function() {
        sidenav?.classList.remove('bg-white');
      }, 100);
      sidenav?.classList.remove('bg-transparent');
  
    } else {
      body.classList.add(className);
      sidenav?.classList.add('bg-white');
      sidenav?.classList.remove('bg-transparent');
      iconSidenav?.classList.remove('d-none');
    }
    // console.log("hol")
    // const aside = document.getElementById('sidenav-main');
    // aside?.classList.add('.g-sidenav-show:not(.rtl)');
    
    
  }
}
