import { Consecuencias } from "./consecuencias";
import { NivelRiesgo } from "./nivel-riesgo";
import { Probabilidad } from "./probabilidad";

export class SistemaNivelRiesgo {
    id!: string;
    nombre!: string;
    descripcion!: string;
    nivelRiesgoList!: NivelRiesgo[];
    consecuenciaList!: Consecuencias[];
    probabilidadList!: Probabilidad[];
}
