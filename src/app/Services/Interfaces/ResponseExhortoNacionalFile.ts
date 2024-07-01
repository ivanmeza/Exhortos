export interface Personas {
  genero: string;
  esPersonaMoral: number|string|boolean;
  id_persona: string;
  nomPersonaMoral: string;
  nombre: string;
  nombreGegero: string;
  nomtipo_parte: string;
  tipoParte: string;

}
export interface dateExhorto {
  etapa_exhorto: string;
  etapa_exhorto_nombre: string;
  exhortoOrigenId: string;
  fechaOrigen: string;
  id_exhorto: string;
  juzgadoOrigenNombre: string;
  municipioDestino: string;
  nom_estado: string;
}
export interface Archivo {
  hashSha1: string;
  hashSha256: string;
  id_archivo: string;
  nombreArchivo: string;
  nomtipo_documento: string;
  tamanokb: string;
  tipoDocumento: string;
  url_archivo: string;
}
export interface DataFile {
  archivos: Archivo[];
  data: dateExhorto;
  personas: Personas[];
}
export interface ResponseExhortoNacionalFile {
  data: DataFile;
  errors: string;
  message: string;
  success: boolean;
}
