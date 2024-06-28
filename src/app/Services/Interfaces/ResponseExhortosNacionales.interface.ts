
export interface ExhortoNacional {
  etapa_exhorto: string;
  exhortoOrigenId: string;
  fechaOrigen: string;
  id_exhorto: string;
  juzgadoOrigenNombre: string;
  municipioDestino: string;
  nom_estado: string;
  // Agrega aquí más propiedades según sea necesario o quitar las que no se requieran
}
export interface DataConTotal {
  data: ExhortoNacional[];
  total: number;
}
export interface ResponseExhortosNacionales{
  data: DataConTotal[];
  errors: string;
  message: string;
  success: boolean;
}
