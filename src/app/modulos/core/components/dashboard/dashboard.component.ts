import { Router } from '@angular/router';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SesionService } from '../../services/sesion.service';
import { ParametroNavegacionService } from '../../services/parametro-navegacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit {

  items: any[] = [];

  nombreAUC!: string;
  nombreSEC!: string;
  nombreCOP!: string;

  panelOpenState = false;

  showFiller = false;

  constructor(
    private sesionService: SesionService,
    private navService: ParametroNavegacionService,
  ) { }

  ngOnInit(): void {
    // this.recargarMenu();
  }

  ngAfterContentInit() {
    this.recargarMenu();
  }

  irHome() {
    this.navService.redirect('/app/home');
  }


  navigate(ruta: any){
    console.log(ruta)
    this.navService.redirect(ruta)
  }

  recargarMenu() {
    this.nombreAUC = this.sesionService.getConfigParam('NOMB_MOD_AUC');
    this.nombreSEC = this.sesionService.getConfigParam('NOMB_MOD_SEC');
    this.nombreCOP = this.sesionService.getConfigParam('NOMB_MOD_COP');
    this.items = [
        // {
        //   label: 'Dashboard',
        //   icon: 'dashboard',
        //   class: 'material-icons'
        // },
        {
            label: 'Administracion',
            icon: 'settings',
            class: 'material-icons',
            codigo: 'ADM',
            expanded: false,
            items:
                [
                    { label: 'Perfiles', codigo: 'ADM_GET_PERF', routerLink: ['app/admin/perfil'], icon: 'person_add', class: 'material-icons' },
                    { label: 'Permisos', codigo: 'ADM_GET_PERM_PERF', routerLink: ['/app/admin/permisos'], icon: 'https', class: 'material-icons' },
                    { label: 'Usuarios', codigo: 'ADM_GET_USR', routerLink: ['/app/admin/usuario'], icon: 'person', class: 'material-icons' },
                ]
        },
        {
            label: 'Empresa',
            icon: 'lan',
            class: 'material-icons',
            codigo: 'EMP',
            expanded: false,
            items:
                [
                    { label: 'Información Empresa', codigo: 'EMP_GET_EMPS', routerLink: ['/app/empresa/empresa'],icon: 'business', class: 'material-icons' },
                    { label: 'Contexto organización', codigo: 'EMP_GET_CTXEMP', routerLink: ['/app/empresa/contextoOrganizacion'],icon: 'extension', class: 'material-icons' },
                    { label: 'Tipos área', codigo: 'EMP_GET_TIPOAREA', routerLink: ['/app/empresa/tipoArea'],icon: 'format_shapes', class: 'material-icons' },
                    { label: 'Organización', codigo: 'EMP_GET_AREA', routerLink: ['/app/empresa/area'],icon: 'account_tree', class: 'material-icons' },
                    { label: 'Cargos', codigo: 'EMP_GET_CARGO', routerLink: ['/app/empresa/cargo'],icon: 'business_center', class: 'material-icons' },
                    { label: 'Talento humano', codigo: 'EMP_GET_EMPL', routerLink: ['/app/empresa/empleado'],icon: 'groups', class: 'material-icons' },
                    { label: 'Evaluación desempeño', codigo: 'EMP_GET_EVALDES', routerLink: ['/app/empresa/evaluacionDesempeno'],icon: 'fact_check', class: 'material-icons' },
                    { label: 'Cargue datos', codigo: 'EMP_POST_LOADEMP', routerLink: ['/app/empresa/cargueDatos'],icon: 'upload_file', class: 'material-icons' },
                    //{ label: 'HHT', codigo: 'EMP_GET_HHT', routerLink: ['/app/empresa/hht'] }
                ]
        },
        {
            label: 'Contratistas',
            icon: 'engineering',
            class: 'material-icons',
            codigo: 'CTR',
            expanded: false,
            items:
                [
                    { label: 'Administración', codigo: 'CTR_ADM', routerLink: '/app/ctr/adminContratistas',icon: 'admin_panel_settings', class: 'material-icons' },
                    { label: 'Seguimiento', codigo: 'CTR_IND', routerLink: '/app/ctr/seguimientoContratistas',icon: 'pie_chart', class: 'material-icons' }
                ]
        },
        {
            label: 'Seguimiento Casos medicos', 
            icon: 'local_hospital',
            class: 'material-icons',
            codigo: 'SCM',
            expanded: false,
            items:
                [
                    { label: 'Creacion de seguimiento caso', codigo: 'SCM_CREATE_CASE', routerLink: '/app/scm/creacion',icon: 'medical_services', class: 'material-icons' },
                    { label: 'Listado de seguimientos', codigo: 'SCM_LIST_CASE', routerLink: '/app/scm/list',icon: 'assignment', class: 'material-icons' },
                    { label: 'Permisos', codigo: 'SCM_PERF_SCM', routerLink: '/app/scm/permisos',icon: 'lock', class: 'material-icons' },

                ]
        },
        {
            label: 'AutoEvaluación',
            icon: 'assignment',
            class: 'material-icons',
            codigo: 'SGE',
            expanded: false,
            items:
                [
                    { label: 'Elaboración SGE', codigo: 'SGE_POST_SGE', routerLink: '/app/sg/sgeForm',icon: 'note_add', class: 'material-icons' },
                    { label: 'Sistemas de Gestión', codigo: 'SGE_GET_SGE', routerLink: '/app/sg/sistemasGestion',icon: 'apps', class: 'material-icons' },
                    { label: 'Consulta Evaluacion', codigo: 'SGE_GET_EVAL', routerLink: '/app/sg/consultaEvaluaciones',icon: 'view_list', class: 'material-icons' }
                ]
        },
        {
            label: 'IPECR',
            icon: 'location_searching',
            class: 'material-icons',
            codigo: 'IPECR',
            expanded: false,
            items:
                [
                    { label: 'Parametrización peligros', codigo: 'IPECR_PARAMPEL', routerLink: '/app/ipr/peligros',icon: 'settings_applications', class: 'material-icons' },
                    { label: 'Elaboración IPECR', codigo: 'IPECR_ELABIPECR', routerLink: '/app/ipr/formularioIpecr',icon: 'info', class: 'material-icons' },
                    { label: 'Consulta IPECR', codigo: 'IPECR_GET_IPECR', routerLink: '/app/ipr/consultaIpecr',icon: 'view_list', class: 'material-icons' },
                ]
        },
        {
            label: 'Inspeccion',
            icon: 'task',
            class: 'material-icons',
            codigo: 'INP',
            expanded: false,
            items:
                [
                    { label: 'Listas de Inspección', codigo: 'INP_GET_LISTINP', routerLink: ['/app/inspecciones/listasInspeccion'],icon: 'format_list_numbered', class: 'material-icons' },
                    { label: 'Elaboración Listas', codigo: 'INP_POST_LISTINP', routerLink: ['/app/inspecciones/elaboracionLista'],icon: '', class: 'material-icons' },
                    { label: 'Programación', codigo: 'INP_GET_PROG', routerLink: ['/app/inspecciones/programacion'],icon: '', class: 'material-icons' },
                    { label: 'Inspecciones Realizadas', codigo: 'INP_GET_INP', routerLink: ['/app/inspecciones/consultaInspecciones'],icon: '', class: 'material-icons' }
                ]
        },
        {
            label: this.nombreAUC,
            icon: 'preview',
            class: 'material-icons',
            codigo: 'AUC',
            expanded: false,
            items:
                [
                    { label: 'Tarjetas', codigo: 'AUC_POST_TARJ', routerLink: '/app/auc/tarjeta' },
                    { label: 'Reportar', codigo: 'AUC_POST_OBS', routerLink: '/app/auc/observaciones',icon: 'visibility', class: 'material-icons' },
                    { label: 'Consultar', codigo: 'AUC_GET_OBS', routerLink: '/app/auc/consultaObservaciones',icon: '', class: 'material-icons' }
                ]
        },
        {
            label: 'Reporte A/I',
            icon: 'dashboard',
            class: 'material-icons',
            codigo: 'RAI',
            expanded: false,
            items:
                [
                    { label: 'Cargar archivo', codigo: 'RAI_POST_ARCH', routerLink: '/app/rai/cargaArchivo',icon: '', class: 'material-icons' },
                    { label: 'Registrar reporte', codigo: 'RAI_POST_REP', routerLink: '/app/rai/registroReporte',icon: '', class: 'material-icons' },
                    { label: 'Consulta reportes', codigo: 'RAI_GET_REP', routerLink: '/app/rai/consultaReportes',icon: '', class: 'material-icons' }
                ]
        },
        {
            label: 'Ausentismo',
            icon: 'dashboard',
            class: 'material-icons',
            codigo: 'AUS',
            expanded: false,
            items:
                [
                    { label: 'Reporte de ausentismo', codigo: 'AUS_POST_REPAUS', routerLink: '/app/aus/reporteAusentismo',icon: '', class: 'material-icons' },
                    { label: 'Consulta de reportes', codigo: 'AUS_GET_REPAUS', routerLink: '/app/aus/consultaAusentismo',icon: '', class: 'material-icons' },
                ]
        },
        {
            label: 'Información Documentada',
            icon: 'dashboard',
            class: 'material-icons',
            codigo: 'ADO',
            expanded: false,
            items:
                [
                    { label: 'Gestión documental', codigo: 'ADO_GET_DIR', routerLink: '/app/ado/gestionDocumental',icon: '', class: 'material-icons' },
                ]
        },

        {
            //label: this.nombreSEC,
            label: 'Seguimiento y Control',
            icon: 'dashboard',
            class: 'material-icons',
            expanded: false,
            codigo: 'SEC',
            items:
                [
                    { label: 'Investigación', codigo: 'SEC_GET_DESV', routerLink: '/app/sec/desviaciones',icon: '', class: 'material-icons' },
                    // { label: 'Investigaciones', codigo: 'SEC_GET_ANADESV', routerLink: '/app/sec/consultaAnalisisDesviaciones', class: 'fa fa-exchange' },
                    { label: 'Tareas asignadas', codigo: 'SEC_GET_TAR', routerLink: '/app/sec/tareasAsignadas',icon: '', class: 'material-icons' },
                    { label: 'Mis tareas', codigo: 'SEC_GET_MYTAR', routerLink: '/app/sec/misTareas',icon: '', class: 'material-icons' },
                ]
        },
        {
            label: 'Indicadores',
            icon: 'dashboard',
            class: 'material-icons',
            codigo: 'IND',
            expanded: false,
            items:
                [
                    // { label: 'Elaboracion tableros', codigo: 'IND_POST_TAB', routerLink: '/app/ind/elaboracionTablero', class: 'fa fa-wrench' },
                    { label: 'Consulta tableros', codigo: 'IND_GET_TAB', routerLink: '/app/ind/consultaTablero',icon: '', class: 'material-icons' },
                    { label: 'Ausentismo', codigo: 'IND_GET_AUS', routerLink: '/app/ind/ausentismo',icon: '', class: 'material-icons' },
                    { label: 'Talento humano', codigo: 'IND_GET_EMP', routerLink: '/app/ind/emp',icon: '', class: 'material-icons' },
                    { label: 'Autoevaluacion', codigo: 'IND_GET_SGE', routerLink: '/app/ind/sge',icon: '', class: 'material-icons' },
                    { label: 'Reporte de accidentes', codigo: 'IND_GET_RAI', routerLink: '/app/ind/rai',icon: '', class: 'material-icons' },
                    { label: 'Inspecciones', codigo: 'IND_GET_INP', routerLink: '/app/ind/inp',icon: '', class: 'material-icons' },
                ]
        },
        {
            label: this.nombreCOP,
            icon: 'dashboard',
            class: 'material-icons',
            codigo: 'COP',
            expanded: false,
            items:
                [
                    { label: 'Actas', codigo: 'COP_GET_ACT', routerLink: '/app/cop/consultaActas',icon: '', class: 'material-icons' }
                ]
        },
        {
            label: "Ayuda",
            icon: 'dashboard',
            class: 'material-icons',
            codigo: 'CONF_GET_MANUSR',
            expanded: false,
            items:
                [
                    { label: 'Manuales', codigo: 'CONF_GET_MANUSR', routerLink: '/app/ayuda/manuales',icon: '', class: 'material-icons' }
                ]
        }
    ];
  }

  
}
