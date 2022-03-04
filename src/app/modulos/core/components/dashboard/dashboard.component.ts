import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.menuItems()
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
      // setTimeout(function() {
      //   sidenav?.classList.remove('bg-white');
      // }, 100);
      // sidenav?.classList.remove('bg-transparent');
  
    } else {
      body.classList.add(className);
      // sidenav?.classList.add('bg-white');
      // sidenav?.classList.remove('bg-transparent');
      // iconSidenav?.classList.remove('d-none');
    }
    // console.log("hol")
    // const aside = document.getElementById('sidenav-main');
    // aside?.classList.add('.g-sidenav-show:not(.rtl)');
    
    
    
  }

  menuItems() {
    this.items=[
      {
        label: 'Administración',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Empresa',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Contratistas'
      },
      {
        label: 'Seguimiento Casos Médicos'
      },
      {
        label: 'Autoevaluación'
      },
      {
        label: 'IPECR'
      },
      {
        label: 'Inspección'
      },
      {
        label: 'Reporte Condiciones'
      },
      {
        label: 'Reporte A/I'
      },
      {
        label: 'Ausentismo'
      },
      {
        label: 'Información Documentada'
      },
      {
        label: 'Seguimiento y Control'
      },
      {
        label: 'Indicadores'
      },
      {
        label: 'Actas COPASST'
      }
    ]
  }
}
