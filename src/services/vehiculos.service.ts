import { Vehiculo } from "../interfaces/type";
import { API } from "./config";

export const getVehiculos = async (): Promise<Vehiculo[]> => {
  try {
    const response = await API.get("/vehiculos.json");
    const vehiculos = response.data;
    return vehiculos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getVehiculosPorPropietario = async (
  id_propietario: number
): Promise<Vehiculo[]> => {
  try {
    const response = await API.get("/vehiculos.json");
    const vehiculos = response.data;
    const vehiculosFiltrados = vehiculos.filter(
      (vehiculo: Vehiculo) => vehiculo.id_propietario === id_propietario
    );
    return vehiculosFiltrados;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getVehiculosPorNombre = async (
  nombre: string
): Promise<Vehiculo[]> => {
  try {
    const response = await API.get<Vehiculo[]>(`/vehiculos.json`);
    console.log(nombre);
    const vehiculos = response.data;
    const vehiculosFiltrados = vehiculos.filter(
      (vehiculo: Vehiculo) => vehiculo.vehiculo === nombre
    );
    console.log(vehiculosFiltrados);
    return vehiculosFiltrados;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getVehiculoPorPlaca = async (placa: string): Promise<Vehiculo> => {
  try {
    const response = await API.get<Vehiculo[]>(`/vehiculos.json`);
    const vehiculos = response.data;
    const vehiculo = vehiculos.find(
      (vehiculo: Vehiculo) => vehiculo.placa === placa
    );
    return vehiculo as Vehiculo;
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
