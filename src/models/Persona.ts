export enum Propuesta {
  PE = "PE", // Poder Ejecutivo
  PL = "PL", // Poder Legislativo
  PJ = "PJ", // Poder Judicial
  EF = "EF", // Ministras y Ministros en funciones
}

export interface Persona {
  nombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  edad: number;
  sexo: string;
  ocupacion: string;
  nivelDeEstudios: string;
  propuesta: Propuesta;
}
