export interface Prospecto {
  _id: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  calle: string;
  numero: string;
  colonia: string;
  codigo_postal: string;
  telefono: string;
  rfc: string;
  estatus: Estatus;
  alt_img?: string;
}

export enum Estatus {
  Enviado = "Enviado",
  Autorizado = "Autorizado",
  Rechazado = "Rechazado"
}
