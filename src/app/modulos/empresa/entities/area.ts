import { Sede } from "./sede";
import { TipoArea } from "./tipo-area";

export class Area {
    id?: string;
    nombre?: string;
    descripcion?: string;
    estructura?:string;
    nivel?: number;
    tipoArea!: TipoArea;
    sede?: Sede;
    areaPadre?: Area;
    areaList?: Area[];
    contacto?: string;
  
    numero?: number;
  
    public nombreTipoArea(): string {
      return this.tipoArea.nombre;
    }
  }
  
  export enum Estructura {
    ORGANIZACIONAL = <any>'ORGANIZACIONAL',
    FISICA = <any>"FISICA"
  }