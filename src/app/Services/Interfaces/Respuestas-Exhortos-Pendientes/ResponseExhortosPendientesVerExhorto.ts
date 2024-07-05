// export interface ArchivosResVerExPendientes{
//   hashSha1: string;
//   hashSha256: string;
//   id_recib_ex_arch: string;
//   nombreArchivo: string;
//   nomtipo_documento: string;
//   tamanokb: string;
//   tipoDocumento: string;
//   url_archivo: string;
// }
// export interface DataResVer{
//   archivos: ArchivosResVerExPendientes[];
//   idrespuestaexhorto: string;
//   exhortoOrigenId: string;
//   respuestaOrigenId: string;
//   areaTurnadoNombre: string;
//   fechaRegistro: string;
//   observaciones: string;
//   enviado: string;
// }
// export interface ResponseExhortosPendientesVerExhorto {
//   data: DataResVer[]
//   errors: string;
//   message: string;
//   success: boolean;
// }


export interface ArchivosResVerExPendientes {
  id_recib_ex_arch: string;
  nombreArchivo: string;
  hashSha1: string;
  hashSha256: string;
  tipoDocumento: string;
  tamanokb: string;
  url_archivo: string;
  nomtipo_documento: string;
}

export interface RespuestaExhortoPendienteVer {
  idrespuestaexhorto: string;
  exhortoOrigenId: string;
  respuestaOrigenId: string;
  areaTurnadoNombre: string;
  fechaRegistro: string;
  observaciones: string;
  enviado: string;
}

export interface ResponseExhortosPendientesVerExhorto {
  success: boolean;
  message: string;
  data: {
    data: RespuestaExhortoPendienteVer;
    archivos: ArchivosResVerExPendientes[];
  };
  errors: string;
}
