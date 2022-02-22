import { Empleado } from "./empleado";
import { Jornada } from "./jornada";

export class ConfiguracionJornada {
    id!: string;
    fechaEntradaVigencia!: Date;
    empleado!: Empleado;
    jornadaList!: Jornada[];
}
