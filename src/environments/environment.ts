// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let protocol = "http";
let host = "localhost";
let port = "8080";
let path = protocol + "://" + host + ":" + port + "/sigess/api/"; 

export const environment = {
  production: false
};

export const endPoints: string | any =  {
  auth: path + "authenticate/",
  empresa: path + "empresa/",
  area: path + "area/",
  tipoArea: path + "tipoArea/",
  sede: path + "sede/",
  cargo: path + "cargo/",
  scm: path + "casomedico/",
  pcl: path + "pcl/",
  EmpresaService: path + "empresa/",
  ContextoOrganizacionService: path + "contextoOrganizacion/",
  CargoService: path + "cargo/",
  CompetenciaService: path + "competencia/",
  RecursoService: path + "recurso/",
  PermisoService: path + "permiso/",
  UsuarioService: path + "usuario/",
  EmpleadoService: path + "empleado/",
  EvaluacionDesempenoService: path + "evaluacionDesempeno/",
  PerfilService: path + "perfil/",
  ConfiguracionJornadaService: path + "configuracionJornada/",
  HorasExtraService: path + "horasExtra/",
  HhtService: path + "hht/",
  emp_perfil: path + "perfil/",
  departamento: path + "departamento/",
  ciudad: path + "ciudad/",
  SistemaGestionService: path + "sistemaGestion/",
  sge_sistemagestion: path + "sistemaGestion/",
  EvaluacionService: path + "evaluacion/",
  sge_respuesta: path + "respuesta/",
  RespuestaService: path + "respuesta/",
  sge_reporte: path + "reportesSGE/",
  ReporteSGEService: path + "reportesSGE/",
  ElementoService: path + "elementoSGE",
  com_ciiu: path + "ciiu/",
  com_arl: path + "arl/",
  com_afp: path + "afp/",
  com_eps: path + "eps/",
  com_prepagadas: path + "prepagadas/",
  com_provsalud: path + "provsalud/",
  com_ccf: path + "ccf/",
  com_pais: path + "pais/",
  com_cie: path + "cie/",
  com_departamento: path + "departamento/",
  CiudadService: path + "ciudad/",
  com_tipoIdentificacion: path + "enums/tipoIdentificacion/",
  com_tipoVinculacion: path + "enums/tipoVinculacion/",
  com_tipoSede: path + "enums/tipoSede/",
  DesviacionService: path + "desviacion/",
  AnalisisDesviacionService: path + "analisisDesviacion/",
  SistemaCausaRaizService: path + "sistemaCausaRaiz/",
  SistemaCausaInmediataService: path + "sistemaCausaInmediata/",
  TareaService: path + "tarea/",
  TipoAreaService: path + "tipoArea/",
  AreaService: path + "area/",
  ListaInspeccionService: path + "listaInspeccion/",
  ProgramacionService: path + "programacion/",
  InspeccionService: path + "inspeccion/",
  TipoHallazgoService: path + "tipoHallazgo/",
  SistemaNivelRiesgoService: path + "sistemaNivelRiesgo/",
  TarjetaService: path + "tarjeta/",
  ObservacionService: path + "observacion/",
  ReporteService: path + "reporte/",
  DirectorioService: path + "directorio/",
  ReporteAusentismoService: path + "reporteAusentismo/",
  CausaAusentismoService: path + "causaAusentismo/",
  IndicadorAusentismoService: path + "indicadorAusentismo/",
  IndicadorEmpresaService: path + "indicadorEmpresa/",
  IndicadorSgeService: path + "indicadorSge/",
  IndicadorService: path + "indicador/",
  TableroService: path + "tablero/",
  ModeloGrafica: path,
  TipoPeligroService: path + "tipoPeligro/",
  PeligroService: path + "peligro/",
  FuenteService: path + "fuente/",
  EfectoService: path + "efecto/",
  TipoControlService: path + "tipoControl/",
  ControlService: path + "control/",
  IpecrService: path + "ipecr/",
  PeligroIpecrService: path + "peligroIpecr/",
  ParticipanteIpecrService: path + "participanteIpecr/",
  ConfiguracionGeneralService: path + "configuracion/",
  SistemaCausaAdministrativaService: path + "sistemaCausaAdministrativa/",
  ActaService: path + "acta/",
  ContactoService: path + "contacto/",
  ManualService: path + "manual/",
  tareaService: path,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
