enum enumTipo {
  'rol',
  'escape',
  'dados',
  'fichas',
  'cartas',
  'tablero',
}

interface Edicion {
  nombre: string;
  anyoLanzamiento: number;
}

export interface Juego {
  nombre: string;
  descripcion: string;
  edad: number;
  jugadoresPermitido: number;
  tipo: enumTipo;
  precio: number;
  imagen?: string;
  ediciones: Edicion;
}
