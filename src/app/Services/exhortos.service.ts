import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TablePersonas } from './Interfaces/TablePersonas.interface';

import { EstadoSelect } from './Interfaces/SelectEstado.interface';
import { EstadosResponse } from './Interfaces/EntidadesFederativas.interface';
import { DeletePersonas } from './Interfaces/DeletePersonas.interface';
import { ResponseExhorto } from './Interfaces/ResponseExhorto.interface';
import { InsertPersonas } from './Interfaces/InsertPersonas.interface';
import { ExhortoNacional, ResponseExhortosNacionales } from './Interfaces/ResponseExhortosNacionales.interface';
import { ResponseVerExhortoSeguimiento } from './Interfaces/ResponseVerExhortoSeguimiento';
import { ResponseExhortoNacionalFile, dateExhorto } from './Interfaces/ResponseExhortoNacionalFile';
import { ResponseExhortoNacionalEnviarDatos } from './Interfaces/ResponseExhortoNacionalEnviarDatos';
import { ExhortosRecibidos, ResponseExhortosRecibidos } from './Interfaces/Exhortos-Recibidos/ResponseExhortosRecibidos';
import { ResponseExhortosRecibidosVerExhorto } from './Interfaces/Exhortos-Recibidos/ResponseExhortosRecibidosVerExhorto';

@Injectable({
  providedIn: 'root'
})

export class ExhortosService {
  // --------------------------------------------------------
  private http = inject(HttpClient);
  private token = environment.tokenMorelos;
  private url = environment.baseUrl;
  // private roo = environment.roo;
  // constructor() { }

  getEntidadesFederativas() {

    return this.http.get<EstadosResponse>(this.url + 'catalogos/Estados',
      {
        headers: {
          'X-Api-Key': this.token
        }
      }).toPromise();
  }

  getDatosEntidadesFederativas(id_estado: string) {
    return this.http.post<EstadoSelect>(this.url + 'catalogos/info_estado', { id_estado },
      { headers: { 'X-Api-Key': this.token } }).toPromise();

  }

  // getMaterias(URL: any,token:any)  {
  //   return this.http.get<any>(URL,{ headers: {'X-Api-Key': token }}).toPromise();
  // }
  InsertPersonas(personas: any) {
    return this.http.post<InsertPersonas>(this.url + 'exhorto_morelos/inser_persona_temp', personas,
      { headers: { 'X-Api-Key': this.token } }).toPromise();
  }
  GetPersonas() {
    return this.http.get<TablePersonas>(this.url + 'exhorto_morelos/tabla_temp',
      { headers: { 'X-Api-Key': this.token } }).toPromise();

  }
  DeletePersona(id_persona: number) {
    return this.http.post<DeletePersonas>(this.url + 'exhorto_morelos/elimina_persona_tmp', { id_persona_tmp: id_persona },
      { headers: { 'X-Api-Key': this.token } }).toPromise();
  }
  InsertExhorto(exhorto: any, formData: FormData) {

    for (const key in exhorto) {
      if (exhorto.hasOwnProperty(key)) {
        formData.append(key, exhorto[key]);
      }
    }
    return this.http.post<any>(this.url + 'exhorto_morelos/insert_exhorto', formData,
      { headers: { 'X-Api-Key': this.token } }).toPromise();
    // return this.http.post<ResponseExhorto>(this.url + 'exhorto_morelos/insert_exhorto',formData,
    // { headers: {'X-Api-Key': this.token}}).toPromise();
  }

  InsertExhortoResponde(exhorto: any, formData: FormData) {

    for (const key in exhorto) {
      if (exhorto.hasOwnProperty(key)) {
        formData.append(key, exhorto[key]);
      }
    }
    return this.http.post<any>(this.url + 'exhorto_morelos/RecibirRespuestaInterno', formData,
      { headers: { 'X-Api-Key': this.token } }).toPromise();
    // return this.http.post<ResponseExhorto>(this.url + 'exhorto_morelos/insert_exhorto',formData,
    // { headers: {'X-Api-Key': this.token}}).toPromise();
  }

  getExhortosPendientes(pageIndex: number, registros: number) {
    return this.http.post<ResponseExhortosNacionales>(this.url + 'exhorto_morelos/tabla_exhorto_pendientes', {
      pageIndex,
      registros
    },
    {
      headers: {
        'X-Api-Key': this.token
      }
    }).toPromise();
  }

  getExhortosRecibidos(pageIndex: number, registros: number) {
    return this.http.post<ResponseExhortosRecibidos>(this.url + 'exhorto/tablainicio', {
      pageIndex: pageIndex,
      registros: registros
    }, {
      headers: {
        'X-Api-Key': this.token
      }
    }).toPromise();
  }

  getVerExhortosRecibidos(idexhorto:ExhortosRecibidos['id_exhorto']) {
    return this.http.get<ResponseExhortosRecibidosVerExhorto>(this.url + `exhorto_morelos/InfoExhortoRecividos/${idexhorto}`, {
      headers: {
        'X-Api-Key': this.token
      }
    }).toPromise();
  }

  getRespuestaPendientes(pageIndex: number, registros: number) {
    return this.http.post<any[]>(this.url + 'exhorto_morelos/tabla_Respuesta_pendientes', {
      pageIndex: pageIndex,
      registros: registros
    }, {
      headers: {
        'X-Api-Key': this.token
      }
    }).toPromise();
  }

  getConsultarExtortos(id_exhorto: ExhortoNacional['id_exhorto']) {

    return this.http.post<ResponseVerExhortoSeguimiento>(this.url + 'exhorto_morelos/seguimientoEnviado',
      { id_exhorto},
      {
        headers: {
          'X-Api-Key': this.token
        }
      }).toPromise();
  }

  getVerExtortos(idexhorto:  ExhortoNacional['id_exhorto']) {

    return this.http.get<ResponseExhortoNacionalFile>(this.url + `exhorto_morelos/InfoExhorto/${idexhorto}`,
      {
        headers: {
          'X-Api-Key': this.token
        }
      }).toPromise();
  }
  // es de tipo ResponseExhortoNacionalFile dateExhorto
  async getEnviarExtortos(exhortoOrigenId: dateExhorto['id_exhorto']) {

    return this.http.post<ResponseExhortoNacionalEnviarDatos>(this.url + 'exhorto_morelos/envioDatosExhorto', { id_exhorto: exhortoOrigenId },
      {
        headers: {
          'X-Api-Key': this.token
        }
      }
    ).toPromise();
  }

  async getEnviarRespuesta(idrespuestaexhorto: number) {
    return this.http.post<any[]>(this.url + 'exhorto_morelos/envioDatosRespuesta', { idrespuestaexhorto: idrespuestaexhorto },
      {
        headers: {
          'X-Api-Key': this.token
        }
      }).toPromise();
  }

  async getInfoRespuestaExhorto(idrespuestaexhorto: number) {
    return this.http.post<any[]>(this.url + 'exhorto_morelos/info_respuesta', { idrespuestaexhorto: idrespuestaexhorto },
      {
        headers: {
          'X-Api-Key': this.token
        }
      }).toPromise();
  }

  // prueba(){
  //   const response = this.http.get<any>(this.roo ,
  //   { headers: {'X-API-Key': '3f236014-6d34-41cc-8741-ad0a5b7dc1e4'}}).toPromise();
  //   console.log(response);
  // }
}
