import { SistemaNivelRiesgo } from "./sistema-nivel-riesgo";

export class Consecuencias {
    id!: string;
    nombre!: string;
    descripcion!: string;
    valor!: number;
    sistemaNivelRiesgo!: SistemaNivelRiesgo;
}
