import { Empresa } from "./empresa";
import { Perfil } from "./perfil";

export interface UsuarioEmpresa {
    perfil: Perfil;
    empresa: Empresa;
}
