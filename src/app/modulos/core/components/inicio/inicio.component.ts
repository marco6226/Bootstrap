import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  itemsBar!: MenuItem[];
  itemsNav!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.menuItemsBar();
    this.menuItemsNav();
  }

  menuItemsBar() {
    this.itemsBar = [
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
    ];
  }

  menuItemsNav() {
    this.itemsNav = [
      {
        label: 'Dashboard',
        items:[
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
      
    ];
  }

}
