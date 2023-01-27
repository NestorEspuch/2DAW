export interface Juego {
  nombre: string;
  descripcion: string;
  edad: number;
  jugadoresPermitido: number;
  tipo: string;
  precio: number;
  imagen?: string;
  ediciones: string[];
}
