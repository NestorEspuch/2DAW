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

export class JuegoDto {
  readonly nombre: string;
  readonly descripcion: string;
  readonly edad: number;
  readonly jugadoresPermitido: number;
  readonly tipo: enumTipo;
  readonly precio: number;
  readonly imagen?: string;
  readonly ediciones: Edicion;
}
