import { Vehiculo } from "../interfaces/type";
import { API } from "./config";

export const getVehiculos = async (): Promise<Vehiculo[]> => {
  try {
    const response = await API.get("/vehiculos");
    const vehiculos = response.data.map(adapterVehiculo);

    return vehiculos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapterVehiculo = (vehiculo: any): Vehiculo => {
  return {
    id_vehiculo: vehiculo.id_vehiculo,
    placa: vehiculo.placa_veh,
    vehiculo: vehiculo.descripcion_veh,
    id_conductor: vehiculo.id_conductor,
  };
};

export const getVehiculosPorConductor = async (
  id_conductor: number
): Promise<Vehiculo[]> => {
  try {
    const response = await API.get(
      `/ControlRegistro/vehiConductor/ ${id_conductor}`
    );
    const vehiculos = response.data;
    return vehiculos.map(adapterVehiculo);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getVehiculosPorNombre = async (
  nombre: string
): Promise<Vehiculo[]> => {
  try {
    const response = await API.get<Vehiculo[]>(
      `/ControlRegistro/descVehiculo/${nombre}`
    );
    const vehiculos = response.data.map(adapterVehiculo);

    return vehiculos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getVehiculoPorPlaca = async (placa: string): Promise<Vehiculo> => {
  try {
    const response = await API.get<Vehiculo>(
      `/ControlRegistro/placaDescripcionVehiculo/${placa}`
    );
    const vehiculo = adapterVehiculo(response.data);
    return vehiculo;
  } catch (error) {
    console.log(error);
    return {} as Vehiculo;
  }
};

export const getVehiculoPorNombre = async (
  nombre: string
): Promise<Vehiculo> => {
  try {
    const response = await API.get<Vehiculo[]>(`/vehiculos.json`);
    const vehiculos = response.data;
    const vehiculo = vehiculos.find(
      (vehiculo: Vehiculo) => vehiculo.vehiculo === nombre
    );
    return vehiculo as Vehiculo;
  } catch (error) {
    console.log(error);
    return {} as Vehiculo;
  }
};

export const getVehiculosControlCombustible = async (): Promise<Vehiculo[]> => {
  try {
    const response = await API.get("/ControlRegistro/getObtenerPlaca");
    const vehiculos = response.data.map(adapterVehiculo);
    return vehiculos;
  } catch (error) {
    console.log(error);
    return [];
  }
};
