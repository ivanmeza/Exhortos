export interface Estado {
  id_estado: string;
  key_estado: string;
  nombre: string;
}

export interface EstadosResponse {
  success: boolean;
  data: Estado[];
}
