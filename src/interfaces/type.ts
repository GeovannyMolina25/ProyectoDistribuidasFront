export interface Ubicacion {
  id_ubicacion: number;
  origen: string;
  destino: string;
}

export interface Conductor {
  id_conductor: number;
  nombre: string;
  apellido: string;
}

export interface Vehiculo {
  id_vehiculo: number;
  placa: string;
  vehiculo: string;
  id_conductor: number;
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

export interface controlCombustibleDashboardDia {
  consumo_galon_total: number;
  kilometros_recorridos_total: number;
  promedio_galonkilometro_total: number;
  total_gastado: number;
}

export interface controlCombustibleVehiculoDia {
  descripcion_vehh: string;
  placa_vehh: string;
  total_km_galon: number;
}
export interface kilometrosRecorridsControlCombustible {
  fecha_control: string;
  km_total: number;
}
