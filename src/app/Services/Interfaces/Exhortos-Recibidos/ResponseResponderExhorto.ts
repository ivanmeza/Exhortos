export interface data {
  exhortoId: string;
  fechaHora: string;
  respuestaOrigenId: string;
}
export interface ResponseResponderExhorto {
  data: data;
  errors: [];
  message: string;
  success: boolean;
}
