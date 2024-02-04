import { Conductor } from "../interfaces/type";
import { API } from "./config";
import { Vehiculo } from "../interfaces/type";
import { getVehiculosPorNombre } from "./vehiculos.service";
export const getConductores = async () => {
  try {
    const response = await API.get("/conductores.json");
    const propietarios = response.data;
    return propietarios;
  } catch (error) {
    console.log(error);
  }
};

export const getConductor = async (id: number) => {
  try {
    const response = await API.get(`/conductores.json`);
    const conductores = response.data;
    return conductores.find((conductor: Conductor) => conductor.id === id);
  } catch (error) {
    console.log(error);
  }
};

export const getConductoresPorVehiculo = async (vehiculo: string) => {
  try {
    const vehiculos: Vehiculo[] = await getVehiculosPorNombre(vehiculo);
    const response = await API.get(`/conductores.json`);
    const conductores = response.data;

    //obtener todos los conductores que tengan el vehiculo en su lista de vehiculos
    // los vehiculos tienen el id del conductor
    const conductoresFiltrados = conductores.filter((conductor: Conductor) => {
      return vehiculos.some(
        (vehiculo) => vehiculo.id_propietario === conductor.id
      );
    });
    return conductoresFiltrados;
  } catch (error) {
    console.log(error);
  }
};
