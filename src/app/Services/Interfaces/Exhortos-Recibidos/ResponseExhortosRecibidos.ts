export interface ExhortosRecibidos {
  etapa_exhorto: string;
  exhortoOrigenId: string;
  fechaOrigen: string;
  folioSeguimiento: string;
  id_exhorto: string;
  juzgadoOrigenNombre: string;
  municipioDestino: string;
  nom_estado: string;
  // Agrega aquí más propiedades según sea necesario o quitar las que no se requieran
}
export interface DataConTotal {
  data: ExhortosRecibidos[];
  total: number;
}
export interface ResponseExhortosRecibidos {
  data: DataConTotal;
  errors: string;
  message: string;
  success: boolean;
}
