export interface Ubicacion {
  id: number;
  origen: string;
  destino: string;
}

export interface Conductor {
  id: number;
  nombre: string;
}

export interface Vehiculo {
  id: number;
  placa: string;
  vehiculo: string;
  id_propietario: number;
}
