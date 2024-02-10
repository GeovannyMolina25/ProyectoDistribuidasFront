import { Conductor } from "../interfaces/type";
import { API } from "./config";
export const getConductores = async () => {
  try {
    const response = await API.get("/users");
    const conductores = response.data.map(adapterConductor);
    return conductores;
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapterConductor = (conductor: any): Conductor => {
  return {
    id_conductor: conductor.id_conductor,
    nombre: conductor.nombre_con,
    apellido: conductor.apellido_con,
  };
};

export const getConductor = async (id: number) => {
  try {
    const response = await API.get(`/users/${id}`);
    const conductor = adapterConductor(response.data);
    console.log(conductor);
    return conductor;
  } catch (error) {
    console.log(error);
  }
};

export const getConductoresControlPorFecha = async (fecha: string) => {
  try {
    const response = await API.get(
      `/ControlRegistro/ConductorContrlCombustiblePorFecha/${fecha}`
    );
    const conductores = response.data.map(adapterConductor);
    console.log(conductores);
    return conductores;
  } catch (error) {
    console.log(error);
  }
};

export const getConductoresPorVehiculo = async (vehiculo: string) => {
  try {
    const response = await API.get(
      `/ControlRegistro/ConductorPorDescripcion/${vehiculo}`
    );
    const conductores = response.data.map(adapterConductor);

    //obtener todos los conductores que tengan el vehiculo en su lista de vehiculos
    // los vehiculos tienen el id del conductor
    return conductores.map(adapterConductor);
  } catch (error) {
    console.log(error);
  }
};
