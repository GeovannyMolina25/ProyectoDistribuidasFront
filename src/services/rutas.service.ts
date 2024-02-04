import { Ubicacion } from "../interfaces/type";
import { API } from "./config";

export const getRutas = async () => {
  try {
    const response = await API.get<Ubicacion[]>("/rutas.json");

    const rutasSinRepetir = response.data.filter(
      (ubicacion, index, self) =>
        index === self.findIndex((t) => t.origen === ubicacion.origen)
    );

    return rutasSinRepetir;
  } catch (error) {
    console.log(error);
  }
};

export const getRutasRepetidas = async () => {
  try {
    const response = await API.get<Ubicacion[]>("/rutas.json");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRutasPorOrigen = async (
  origen: string
): Promise<Ubicacion[]> => {
  try {
    const response = await API.get<Ubicacion[]>("/rutas.json");
    const rutas = response.data;
    const rutasFiltradas = rutas.filter(
      (ruta: Ubicacion) => ruta.origen === origen
    );
    return rutasFiltradas;
  } catch (error) {
    console.log(error);
    return [];
  }
};
