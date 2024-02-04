import { create } from "zustand";

import { Ubicacion } from "../interfaces/type";
import {
  getRutas,
  getRutasPorOrigen,
  getRutasRepetidas,
} from "../services/rutas.service";

interface UbicacionState {
  ubicacion: Ubicacion | null;
  establecerUbicacion: (ubicacion: Ubicacion) => void;
  ubicaciones: Ubicacion[];
  ubicacionesRepetidas: Ubicacion[];
  obtenerUbicaciones: () => void;
  obtenerUbicacionesRepetidas: () => void;
  obtenerUbicacionesPorOrigen: (origen: string) => void;
}

export const useUbicacionStore = create<UbicacionState>((set) => ({
  ubicacion: null,
  ubicaciones: [],
  ubicacionesRepetidas: [],
  establecerUbicacion: (ubicacion) => {
    set({ ubicacion });
  },
  obtenerUbicaciones: () => {
    getRutas().then((ubicaciones) => {
      set({ ubicaciones });
    });
  },
  obtenerUbicacionesPorOrigen: (origen: string) => {
    getRutasPorOrigen(origen).then((ubicaciones) => {
      set({ ubicaciones });
      if (ubicaciones.length === 1) set({ ubicacion: ubicaciones[0] });
    });
  },
  obtenerUbicacionesRepetidas: () => {
    getRutasRepetidas().then((ubicaciones) => {
      set({ ubicacionesRepetidas: ubicaciones });
    });
  },
}));
