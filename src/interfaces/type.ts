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

export interface ControlCombustible {
  date: string;
  placa: string;
  vehiculo: string;
  conductor: string;
  origenUbicacion: string;
  destinoUbicacion: string;
  kmInicial: number;
  kmFinal: number;
  kmRecorridos: number;
  galon: number;
  valorCompra: number;
  kmPorGalon: number;
  KmPorMoneda: number;
  tipoCombustible: string;
  NumeroDocumento: string;
  comentario: string;
}
