import { create } from "zustand";
import { Vehiculo } from "../interfaces/type";

import {
  getVehiculosPorNombre,
  getVehiculoPorPlaca,
  getVehiculos,
  getVehiculosPorConductor,
  getVehiculoPorNombre,
  getVehiculosControlCombustible,
} from "../services/vehiculos.service";
import { useConductorStore } from "./ConductorStore";

interface VehiculoState {
  vehiculo: Vehiculo | null;
  vehiculos: Vehiculo[];
  obtenerVehiculos: () => void;
  obtenerVehiculosPorPropietario: (id_conductor: number) => void;
  obtenerVehiculosPorNombre: (nombre: string) => void;
  obtenerVehiculoPorPlaca: (placa: string) => void;
  obtenerVehiculoPorNombre: (nombre: string) => void;
  establecerVehiculo: (vehiculo: Vehiculo) => void;
  establecerVehiculoPorConductor: (id: number) => void;
  obtenerVehiculosControlCombustible: () => void;
  limpiarVehiculo: () => void;
}

export const useVehiculoStore = create<VehiculoState>((set) => ({
  vehiculo: null,
  vehiculos: [],
  obtenerVehiculos: () => {
    getVehiculos().then((vehiculos) => {
      set({ vehiculos });
    });
  },
  obtenerVehiculosPorPropietario: (id_conductor: number) => {
    getVehiculosPorConductor(id_conductor).then((vehiculoPorConductor) => {
      set({ vehiculos: vehiculoPorConductor });
      if (vehiculoPorConductor.length === 1)
        set({ vehiculo: vehiculoPorConductor[0] });
    });
  },
  obtenerVehiculosPorNombre: (nombre: string) => {
    getVehiculosPorNombre(nombre).then((vehiculos) => {
      set({ vehiculos: vehiculos });
      if (vehiculos.length === 1) set({ vehiculo: vehiculos[0] });
      const conductor = useConductorStore.getState().conductor;
      if (conductor) {
        console.log(conductor);
        set({
          vehiculo: vehiculos.find(
            (v) => v.id_conductor === conductor.id_conductor
          ),
        });
      }
    });
  },
  obtenerVehiculoPorPlaca: (placa: string) => {
    getVehiculoPorPlaca(placa).then((vehiculo) => {
      set({ vehiculo });
    });
  },
  obtenerVehiculoPorNombre: (nombre: string) => {
    getVehiculoPorNombre(nombre).then((vehiculo) => {
      set({ vehiculo });
    });
  },
  establecerVehiculo: (vehiculo) => {
    set({ vehiculo });
  },
  establecerVehiculoPorConductor: (id: number) => {
    const vehiculo = useVehiculoStore
      .getState()
      .vehiculos.find((v) => v.id_conductor === id);
    set({ vehiculo: vehiculo });
  },
  limpiarVehiculo: () => {
    set({ vehiculo: null });
    //traer todos los vehiculos
    useVehiculoStore.getState().obtenerVehiculos();
  },
  obtenerVehiculosControlCombustible: () => {
    getVehiculosControlCombustible().then((vehiculos) => {
      set({ vehiculos });
    });
  },
}));
