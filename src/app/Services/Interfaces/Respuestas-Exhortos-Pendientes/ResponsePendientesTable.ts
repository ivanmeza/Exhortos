export interface ExhortosRecibidosPendientes {
  areaTurnadoNombre: string,
  enviado: string,
  exhortoOrigenId: string,
  fechaRegistro: string,
  idrespuestaexhorto: string,
  observaciones: string,
  respuestaOrigenId: string,
}
export interface DataTotal {
  data: ExhortosRecibidosPendientes[];
  total: number,
}
export interface ResponsePendientesTable {
  data: DataTotal[]
  success: boolean,
  message: string,
  errors: string
}
