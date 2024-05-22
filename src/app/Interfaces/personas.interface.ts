export interface Personas {
  data: Datos[];
  errors?: string;
  message?: string;
  success: boolean;

}

interface Datos {
  id_persona_tmp?:string;
  nombre?: string;
  tipo_parte?:string;
  tipo_persona?:string;
}

