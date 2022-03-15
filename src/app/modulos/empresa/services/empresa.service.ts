import { endPoints } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInt } from 'src/app/httpInt';
import { ServiceCRUD } from '../../core/services/service-crud.service';
import { Empresa } from '../entities/empresa';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends ServiceCRUD<Empresa>{

//   obtenerContratistas<Empresa>(empresaId: string) {
//     return new Promise(resolve => {
//         this.httpInt.get(this.end_point + "contratistas/" + empresaId)
//         .subscribe(
//           res => {
//               resolve(res);
//           }
//           ,
//           err => this.manageError(err)
//       ),    
//       map(res => res)
            
//     });
// }

// vincularContratista(contratista: Empresa) {
//     let entity = new Empresa();
//     entity.id = contratista.id;
//     let body = JSON.stringify(entity);
//     return new Promise(resolve => {
//         this.httpInt.put(this.end_point + "contratistas", body)
//             .map(res => res)
//             .subscribe(
//                 res => {
//                     resolve(res);
//                 }
//                 ,
//                 err => this.manageError(err)
//             )
//     });
// }

findByUsuario(usuarioId: string | null | undefined) {
    return new Promise(resolve => {
        this.httpInt.get(endPoints.EmpresaService + "usuario/" + usuarioId)
            // .map(res => res)
            .subscribe(
                res => {
                    resolve(res);
                }
                ,
                err => this.manageError(err)
            )
    });
}

// findSelected() {
//     return new Promise(resolve => {
//         this.httpInt.get(endPoints.EmpresaService + "selected")
//             .map(res => res)
//             .subscribe(
//                 res => {
//                     resolve(res);
//                 }
//                 ,
//                 err => this.manageError(err)
//             )
//     });
// }

getClassName(): string {
    return "EmpresaService";
}

}