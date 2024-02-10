import { Ubicacion } from "../interfaces/type";
import { API } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapterUbicacion = (ubicacion: any): Ubicacion => {
  return {
    id_ubicacion: ubicacion.id_ubicacion,
    origen: ubicacion.origen_ubi,
    destino: ubicacion.destino_ubi,
  };
};
export const getRutas = async () => {
  try {
    const response = await API.get("/ubicacionSinRepetirOrigen");

    const rutas = response.data.map(adapterUbicacion);
    console.log(rutas);
    return rutas;
  } catch (error) {
    console.log(error);
  }
};

export const getRutasRepetidas = async () => {
  try {
    const response = await API.get<Ubicacion[]>("/ubicacion");
    return response.data.map(adapterUbicacion);
  } catch (error) {
    console.log(error);
  }
};

export const getRutasPorOrigen = async (
  origen: string
): Promise<Ubicacion[]> => {
  try {
    const response = await API.get<Ubicacion[]>(
      `/ControlRegistro/UbiFinalPorUbiOrigen/:origen/${origen}`
    );
    console.log(response.data);
    return response.data.map(adapterUbicacion);
  } catch (error) {
    console.log(error);
    return [];
  }
};
