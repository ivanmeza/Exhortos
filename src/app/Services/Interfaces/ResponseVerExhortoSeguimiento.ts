interface Archivo {
  nombreArchivo: string;
  tamanokb: string;
}
interface Parte {
  Genero?: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  esPersonaMoral: number|boolean;
  nombre: string;
  tipoParte: number;
  tipoParteNombre?: string;
  // Agregar más propiedades según el objeto proporcionado
}

export interface Data {
  archivos: Archivo[];

  diasResponder: number;
  estadoDestinoId: number;
  estadoDestinoNombre: string;
  estadoOrigenId: number;
  estadoOrigenNombre: string;
  exhortoOrigenId: string;
  fechaHoraRecepcion: string;
  fechaOrigen: string;
  fojas: number;
  folioSeguimiento: string;
  juezExhortante: string;
  juzgadoOrigenId: string;
  juzgadoOrigenNombre: string;
  materiaClave: string;
  materiaNombre: string;
  municipioDestinoId: number;
  municipioDestinoNombre: string;
  municipioOrigenId: number;
  municipioOrigenNombre: string;
  numeroExpedienteOrigen: string;
  numeroOficioOrigen: string;
  observaciones?: string;


  partes: Parte[];
  tipoDiligenciacionNombre: string;
  tipoJuicioAsuntoDelitos: string;

}
export interface ResponseVerExhortoSeguimiento {
  data: Data;
  errors?: string;
  estado: number;
  message?: string;
  success: boolean;
}


//respaldo interface
// interface Archivo {
//   nombreArchivo: string;
//   tamaño: number;
// }
// interface Parte {
//   apellidoMaterno: string;
//   apellidoPaterno: string;
//   esPersonaMoral: number|boolean;
//   genero: string;
//   nombre: string;
//   tipoParte: number;
//   tipoParteNombre: string | number | null;
//   // Agregar más propiedades según el objeto proporcionado
// }

// export interface Data {
//   archivos: Archivo[];
//   areaTurnadoId: string;
//   areaTurnadoNombre: string;
//   diasResponder: number;
//   estadoDestinoId: number;
//   estadoDestinoNombre: string;
//   estadoOrigenId: number;
//   estadoOrigenNombre: string;
//   exhortoOrigenId: string;
//   fechaHoraRecepcion: string;
//   fechaOrigen: string;
//   fojas: number;
//   folioSeguimiento: string;
//   juezExhortante: string;
//   juzgadoOrigenId: string;
//   juzgadoOrigenNombre: string;
//   materiaClave: string;
//   materiaNombre: string;
//   municipioDestinoId: number;
//   municipioDestinoNombre: string;
//   municipioOrigenId: number;
//   municipioOrigenNombre: string;
//   municipioTurnadoId: number;
//   municipioTurnadoNombre: string;
//   numeroExhorto: string | null;
//   numeroExpedienteOrigen: string;
//   numeroOficioOrigen: string;
//   observaciones: string | null;
//   partes: Parte[];
//   tipoDiligenciacionNombre: string;
//   tipoJuicioAsuntoDelitos: string;
//   urlInfo: string | null;
// }
// export interface ResponseVerExhortoSeguimiento {
//   data: Data;
//   errors: string;
//   estado: number;
//   message: string;
//   success: boolean;
// }
