export interface EstadoSelect {
  data: {
    materias: Materia[];
    municipios: Municipio[];
  };
  success: boolean;
}

export interface Materia{
  clave: string;
  descripcion: string;
  nombre: string;
}

export interface Municipio{
  id_estado_municipio: string;
  nombre: string;
}
