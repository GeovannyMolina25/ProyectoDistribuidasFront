import { controlCombustibleVehiculoDia } from "../interfaces/type";
import { API } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postControlCombustible = async (controlCombustible: any) => {
  try {
    const response = await API.post(
      "ControlRegistro/ControlRegistro",
      controlCombustible
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getControlCombustibleDashboardDia = async (fecha: string) => {
  try {
    const response = await API.get(
      `/ControlRegistro/DatosDashboartPorFecha/${fecha}`
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getControlCombustibleVehiculoDia = async (fecha: string) => {
  try {
    const response = await API.get<controlCombustibleVehiculoDia[]>(
      `/ControlRegistro/DatosGraficoPorfecha/${fecha}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getControlCombustiblePorFechaConductor = async (
  fecha: string,
  id_conductor: number
) => {
  try {
    const response = await API.get(
      `/ControlRegistro/DatosGraficoPorfechaPorId/${fecha}/${id_conductor}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKilomentroosRecorridosByVehculoPlaca = async (
  placa: string
) => {
  try {
    const response = await API.get(
      `/ControlRegistro/KilometrosRecorridosPorPlaca/${placa}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
