export interface Documento {
  archivo: {
    nombreArchivo: string;
    tamaño: number;
  };
  acuse?: {
    exhortoOrigenId: string;
    urlInfo: string;
    folioSeguimiento: string;
    fechaHoraRecepcion: string;
  };
}
export interface Exhorto {
  exhortoOrigenId: string;
  fechaHora: string;
}
export interface ResponseExhorto{
  data:{
    documentos: Documento[];
    exhorto: Exhorto
  }
  estado: number;
  success: boolean;
}
