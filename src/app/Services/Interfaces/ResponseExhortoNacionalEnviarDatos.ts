export interface Exhorto {
  exhortoOrigenId: string;
  fechaHora: string;
}
export interface Documentos {
  exhortoOrigenId: string;
  fechaHoraRecepcion: string;
  folioSeguimiento: string;
  urlInforme: string;
}
export interface Data {
  documentos: Documentos;
  exhorto: Exhorto;
}
export interface ResponseExhortoNacionalEnviarDatos {
  data: Data;
  estado: number;
  success: boolean;
}
