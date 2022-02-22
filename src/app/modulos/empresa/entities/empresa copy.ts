import { Arl } from "../../comun/entities/arl";
import { Ciiu } from "../../comun/entities/ciiu";

export interface Empresa {
    id: string;
    nombreComercial: string;
    razonSocial: string;
    nit: string;
    direccion: string;
    telefono: string;
    email: string;
    web: string;
    numeroSedes: Number;
    arl: Arl;
    ciiu: Ciiu;
    logo:string;
    empresasContratistasList: Empresa[];
}
