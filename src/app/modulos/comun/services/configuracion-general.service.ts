import { ConfiguracionGeneral } from './../entities/configuracion-general';
import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../core/services/service-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGeneralService extends ServiceCRUD<ConfiguracionGeneral>{

  obtenerPorEmpresa() {
    return new Promise(async (resolve, reject) => {
        await this.httpInt.get(this.end_point + 'empresa')
        .subscribe(res => {
            console.log(res)   
            resolve(res)
        },
        err => {
            this.manageError(err);
            console.log(err) 
            reject(err);
        })
            // .subscribe(
            //     res => resolve(res),
            //     err => {
            //         this.manageError(err);
            //         reject(err);
            //     }
            // )
    });
}

getClassName() {
    return 'ConfiguracionGeneralService';
}
}