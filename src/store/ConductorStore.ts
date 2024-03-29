import { create } from "zustand";
import { Conductor } from "../interfaces/type";
import {
  getConductor,
  getConductores,
  getConductoresPorVehiculo,
  getConductoresControlPorFecha,
} from "../services/conductores.service";

interface ConductorState {
  conductor: Conductor | null;
  conductores: Conductor[];
  obtenerConductor: (id: number) => void;
  obtenerConductores: () => void;
  obtenerConductoresPorVehiculo: (vehiculo: string) => void;
  establecerConductor: (conductor: Conductor) => void;
  obtenerConductoresControlPorFecha: (fecha: string) => void;
  limpiarConductor: () => void;
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
      if (conductores.length === 1) {
        set({ conductor: conductores[0] });
      } else set({ conductores: conductores });
    });
  },
  establecerConductor: (conductor) => {
    set({ conductor });
  },
  limpiarConductor: () => {
    set({ conductor: null });
    //traer todos los conductores
    useConductorStore.getState().obtenerConductores();
  },
  obtenerConductoresControlPorFecha: (fecha: string) => {
    getConductoresControlPorFecha(fecha).then((conductores) => {
      set({ conductores });
    });
  },
}));
