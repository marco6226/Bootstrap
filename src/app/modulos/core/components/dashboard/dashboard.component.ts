import { Empleado } from './../../../empresa/entities/empleado';
import { Usuario } from './../../../empresa/entities/usuario';
import { Empresa } from './../../../empresa/entities/empresa';
import { Router } from '@angular/router';
import { AfterContentInit, Component, EventEmitter, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
import { SesionService } from '../../services/sesion.service';
import { ParametroNavegacionService } from '../../services/parametro-navegacion.service';
import { EmpresaService } from 'src/app/modulos/empresa/services/empresa.service';
import { AuthService } from '../../auth.service';
import { ConfiguracionGeneralService } from 'src/app/modulos/comun/services/configuracion-general.service';
import { ConfiguracionGeneral } from 'src/app/modulos/comun/entities/configuracion-general';
import { PermisoService } from 'src/app/modulos/admin/services/permiso.service';
import { Permiso } from 'src/app/modulos/empresa/entities/permiso';
import { EmpleadoService } from 'src/app/modulos/empresa/services/empleado.service';

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

//   getEmpresa?: Empresa | null;
  

  empresasItems: SelectItem[] = [];
  empresaSelect?: Empresa | null;
  empresaSelectOld?: Empresa | null;
  usuario: Usuario | null | undefined;
  empleado!: Empleado;
  
//   items!: MenuItem[];
  mapaPermisos: any;
  modalDianostico = false;
  displayModal!: boolean;
//   tarea: MisTareasComponent;
  public tareasPendientes: any;


  constructor(
    private sesionService: SesionService,
    private navService: ParametroNavegacionService,
	private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private confGenService: ConfiguracionGeneralService,
	private permisoService: PermisoService,
    private empleadoService: EmpleadoService,
	private confirmationService: ConfirmationService,
    

  ) { }

  ngOnInit(): void {
    this.usuario = this.sesionService.getUsuario();
    console.log(this.usuario)
    this.empresaService.findByUsuario(this.usuario?.id).then(
        resp => {
            this.loadItems(<Empresa[]>resp)
            console.log(resp)
        }
    );
  }

  ngAfterContentInit() {
    this.recargarMenu();
  }

  async loadItems(empresas: Empresa[]) {
    empresas.forEach(emp => {
        this.empresasItems.push({ label: emp.nombreComercial, value: emp });
    });
    console.log(this.sesionService.getEmpresa())
    if (this.sesionService.getEmpresa() == null) {
        this.sesionService.setEmpresa(empresas[1]);
        console.log("hola")
    }
    // this.getEmpresa = this.sesionService.getEmpresa(); 
    // console.log(this.getEmpresa, this.getEmpresa?.nombreComercial)
    console.log(empresas,empresas[0],this.sesionService.getEmpresa())
    // this.val=this.empresasItems[0].value;
    console.log(this.empresasItems)
    this.empresaSelect = this.sesionService.getEmpresa();
    this.empresaSelectOld = this.empresaSelect;
    console.log(this.empresaSelectOld, this.empresaSelect)

    await this.confGenService.obtenerPorEmpresa().then((resp: ConfiguracionGeneral | any)=>{
            console.log(resp)
            let mapaConfig: any = {};
            resp.forEach((conf: ConfiguracionGeneral) => {
                mapaConfig[conf.codigo] =  { 'valor': conf.valor, 'nombre': conf.nombre }
            });
            this.sesionService.setConfiguracionMap(mapaConfig);
            this.recargarMenu();
        });
  

        await this.permisoService.findAll().then((data: Permiso[] | any)=>{
            console.log(data)
            this.mapaPermisos = {};
            data.forEach((element: any) => this.mapaPermisos[element.recurso.codigo] = { 'valido': element.valido, 'areas': element.areas });
            this.sesionService.setPermisosMap(this.mapaPermisos);
            console.log(this.mapaPermisos)
            this.recargarMenu();
        })

        await this.empleadoService.findempleadoByUsuario(this.usuario?.id).then(resp=>{
            console.log(resp)
            this.empleado = <Empleado>(resp);
            console.log(this.empleado);
            this.sesionService.setEmpleado(this.empleado);
        })
    }

    async onLogout(){
        await this.authService.logout().then(
            resp =>{ 
                window.location.reload();
                this.router.navigate(['/login']);
            }
		).catch(
			err => {				
				alert("Se produjo un error al cerrar sesión, ingresar nuevamente")
			}
		);
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
                    { label: 'Administración', codigo: 'CTR_ADM', routerLink: ['/app/ctr/adminContratistas'],icon: 'admin_panel_settings', class: 'material-icons' },
                    { label: 'Seguimiento', codigo: 'CTR_IND', routerLink: ['/app/ctr/seguimientoContratistas'],icon: 'pie_chart', class: 'material-icons' }
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
                    { label: 'Creacion de seguimiento caso', codigo: 'SCM_CREATE_CASE', routerLink: ['/app/scm/creacion'],icon: 'medical_services', class: 'material-icons' },
                    { label: 'Listado de seguimientos', codigo: 'SCM_LIST_CASE', routerLink: ['/app/scm/list'],icon: 'assignment', class: 'material-icons' },
                    { label: 'Permisos', codigo: 'SCM_PERF_SCM', routerLink: ['/app/scm/permisos'],icon: 'lock', class: 'material-icons' },

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
                    { label: 'Elaboración SGE', codigo: 'SGE_POST_SGE', routerLink: ['/app/sg/sgeForm'],icon: 'note_add', class: 'material-icons' },
                    { label: 'Sistemas de Gestión', codigo: 'SGE_GET_SGE', routerLink: ['/app/sg/sistemasGestion'],icon: 'apps', class: 'material-icons' },
                    { label: 'Consulta Evaluacion', codigo: 'SGE_GET_EVAL', routerLink: ['/app/sg/consultaEvaluaciones'],icon: 'view_list', class: 'material-icons' }
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
                    { label: 'Parametrización peligros', codigo: 'IPECR_PARAMPEL', routerLink: ['/app/ipr/peligros'],icon: 'settings_applications', class: 'material-icons' },
                    { label: 'Elaboración IPECR', codigo: 'IPECR_ELABIPECR', routerLink: ['/app/ipr/formularioIpecr'],icon: 'info', class: 'material-icons' },
                    { label: 'Consulta IPECR', codigo: 'IPECR_GET_IPECR', routerLink: ['/app/ipr/consultaIpecr'],icon: 'view_list', class: 'material-icons' },
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
                    { label: 'Tarjetas', codigo: 'AUC_POST_TARJ', routerLink: ['/app/auc/tarjeta'] },
                    { label: 'Reportar', codigo: 'AUC_POST_OBS', routerLink: ['/app/auc/observaciones'],icon: 'visibility', class: 'material-icons' },
                    { label: 'Consultar', codigo: 'AUC_GET_OBS', routerLink: ['/app/auc/consultaObservaciones'],icon: '', class: 'material-icons' }
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
                    { label: 'Cargar archivo', codigo: 'RAI_POST_ARCH', routerLink: ['/app/rai/cargaArchivo'],icon: '', class: 'material-icons' },
                    { label: 'Registrar reporte', codigo: 'RAI_POST_REP', routerLink: ['/app/rai/registroReporte'],icon: '', class: 'material-icons' },
                    { label: 'Consulta reportes', codigo: 'RAI_GET_REP', routerLink: ['/app/rai/consultaReportes'],icon: '', class: 'material-icons' }
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
                    { label: 'Reporte de ausentismo', codigo: 'AUS_POST_REPAUS', routerLink: ['/app/aus/reporteAusentismo'],icon: '', class: 'material-icons' },
                    { label: 'Consulta de reportes', codigo: 'AUS_GET_REPAUS', routerLink: ['/app/aus/consultaAusentismo'],icon: '', class: 'material-icons' },
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
                    { label: 'Investigación', codigo: 'SEC_GET_DESV', routerLink: ['/app/sec/desviaciones'],icon: '', class: 'material-icons' },
                    // { label: 'Investigaciones', codigo: 'SEC_GET_ANADESV', routerLink: '/app/sec/consultaAnalisisDesviaciones', class: 'fa fa-exchange' },
                    { label: 'Tareas asignadas', codigo: 'SEC_GET_TAR', routerLink: ['/app/sec/tareasAsignadas'],icon: '', class: 'material-icons' },
                    { label: 'Mis tareas', codigo: 'SEC_GET_MYTAR', routerLink: ['/app/sec/misTareas'],icon: '', class: 'material-icons' },
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
                    { label: 'Consulta tableros', codigo: 'IND_GET_TAB', routerLink: ['/app/ind/consultaTablero'],icon: '', class: 'material-icons' },
                    { label: 'Ausentismo', codigo: 'IND_GET_AUS', routerLink: ['/app/ind/ausentismo'],icon: '', class: 'material-icons' },
                    { label: 'Talento humano', codigo: 'IND_GET_EMP', routerLink: ['/app/ind/emp'],icon: '', class: 'material-icons' },
                    { label: 'Autoevaluacion', codigo: 'IND_GET_SGE', routerLink: ['/app/ind/sge'],icon: '', class: 'material-icons' },
                    { label: 'Reporte de accidentes', codigo: 'IND_GET_RAI', routerLink: ['/app/ind/rai'],icon: '', class: 'material-icons' },
                    { label: 'Inspecciones', codigo: 'IND_GET_INP', routerLink: ['/app/ind/inp'],icon: '', class: 'material-icons' },
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
                    { label: 'Actas', codigo: 'COP_GET_ACT', routerLink: ['/app/cop/consultaActas'],icon: '', class: 'material-icons' }
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
                    { label: 'Manuales', codigo: 'CONF_GET_MANUSR', routerLink: ['/app/ayuda/manuales'],icon: '', class: 'material-icons' }
                ]
        }
    ];
  }


  async onChangeEmpresa() {
    console.log(this.empresaSelect)
    console.log(this.empresaSelectOld)

    console.log("sip")
    this.empresaSelect = this.sesionService.getEmpresa()
    console.log(this.sesionService.getEmpresa(),this.empresaSelect)
    this.confirmationService.confirm({
        header: '¿Cambiar a la empresa "' + this.empresaSelect?.nombreComercial + '"?',
        message: 'Esto reiniciará la sesión actual, ¿Desea continuar?',
        accept: async() => {
            this.sesionService.setEmpresa(this.empresaSelect!);				
            //await location.reload();
            await this.router.navigate([('/app/home')]);
            // await location.reload();
        },
        reject: () => {
            this.empresaSelect = this.empresaSelectOld;
        },
    });		

    
    }
    async onChangeEmpresaSelect(empresa: any){
        // this.empresaSelectOld = empresa
        // console.log(empresa, this.empresaSelect);
        // await this.sesionService.setEmpresa(empresa);
        // await this.sesionService.getEmpresa()
        // this.ngOnInit();

        // console.log(empresa, this.empresaSelect)
        // console.log(this.empresaSelect)

        // console.log("sip")
        // this.empresaSelect = await this.sesionService.getEmpresa()
        
        this.confirmationService.confirm({
            header: '¿Cambiar a la empresa "' + empresa.value.nombreComercial + '"?',
            message: 'Esto reiniciará la sesión actual, ¿Desea continuar?',
            accept: async() => {
                await this.sesionService.setEmpresa(empresa);	
                console.log(await this.sesionService.getEmpresa(),this.empresaSelect)
                await location.reload();
                await this.router.navigate([('/app/home')]);
                // await location.reload();
            },
            reject: () => {
                this.empresaSelect = this.empresaSelectOld;
            },
        });		
    }

}