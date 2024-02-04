import { create } from "zustand";
import { Conductor } from "../interfaces/type";
import {
  getConductor,
  getConductores,
  getConductoresPorVehiculo,
} from "../services/conductores.service";

interface ConductorState {
  conductor: Conductor | null;
  conductores: Conductor[];
  obtenerConductor: (id: number) => void;
  obtenerConductores: () => void;
  obtenerConductoresPorVehiculo: (vehiculo: string) => void;
  establecerConductor: (conductor: Conductor) => void;
}
export const useConductorStore = create<ConductorState>((set) => ({
  conductor: null,
  conductores: [],
  obtenerConductor: (id: number) => {
    getConductor(id).then((conductor) => {
      set({ conductor });
    });
  },
  obtenerConductores: () => {
    getConductores().then((conductores) => {
      set({ conductores });
    });
  },
  obtenerConductoresPorVehiculo: (vehiculo: string) => {
    getConductoresPorVehiculo(vehiculo).then((conductores) => {
      set({ conductores: conductores });
    });
  },
  establecerConductor: (conductor) => {
    set({ conductor });
  },
}));
