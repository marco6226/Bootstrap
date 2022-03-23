import { endPoints } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../core/services/service-crud.service';
import { Permiso } from '../../empresa/entities/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService extends ServiceCRUD<Permiso>{

  findAllByPerfil(perfilId: string) {
    return new Promise(resolve => {
      this.httpInt.get(endPoints.PermisoService + "perfil/" + perfilId)
        .subscribe(res =>{
          resolve(res);
        },
        err => this.manageError(err)
        )
    });
  }

  getClassName() : string{
    return "PermisoService";
  }
}
