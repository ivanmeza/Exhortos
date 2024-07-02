export interface Exhorto {
  exhortoOrigenId: string;
  fechaHora: string;
}
export interface Data {
  documentos: string;
  exhorto: Exhorto;
}
export interface ResponseExhortoNacionalEnviarDatos {
  data: Data;
  estado: number;
  success: boolean;
}
