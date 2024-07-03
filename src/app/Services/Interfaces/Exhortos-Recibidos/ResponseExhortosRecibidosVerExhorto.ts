export interface Personas {
  Genero?: string;
  esPersonaMoral: string|number;
  id_persona: string;
  nomPersonaMoral: string;
  nombre: string;
  nombreGegero: string;
  nomtipo_parte: string;
  tipoParte: string;
}
export interface Archivos {
  hashSha1?: string|null;
  hashSha256: string;
  id_archivo: string;
  nombreArchivo: string;
  nomtipo_documento: string;
  tamanokb: string;
  tipoDocumento: string;
  url_archivo: string;
}

export interface Data {
  archivos: Archivos[];
  etapa_exhorto: string;
  etapa_exhorto_nombre: string;
  exhortoOrigenId: string;
  fechaOrigen: string;
  id_exhorto: string;
  juzgadoOrigenNombre: string;
  municipioDestino: string;
  nom_estado: string;
  personas: Personas[];
}
export interface ResponseExhortosRecibidosVerExhorto {
  data: Data;
  errors: string;
  message: string;
  success: boolean;
}
