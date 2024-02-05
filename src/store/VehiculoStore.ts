import { create } from "zustand";
import { Vehiculo } from "../interfaces/type";

import {
  getVehiculosPorNombre,
  getVehiculoPorPlaca,
  getVehiculos,
  getVehiculosPorPropietario,
  getVehiculoPorNombre,
} from "../services/vehiculos.service";
import { useConductorStore } from "./ConductorStore";

interface VehiculoState {
  vehiculo: Vehiculo | null;
  vehiculos: Vehiculo[];
  obtenerVehiculos: () => void;
  obtenerVehiculosPorPropietario: (id_propietario: number) => void;
  obtenerVehiculosPorNombre: (nombre: string) => void;
  obtenerVehiculoPorPlaca: (placa: string) => void;
  obtenerVehiculoPorNombre: (nombre: string) => void;
  establecerVehiculo: (vehiculo: Vehiculo) => void;
  establecerVehiculoPorConductor: (id: number) => void;
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
  obtenerVehiculosPorPropietario: (id_propietario: number) => {
    getVehiculosPorPropietario(id_propietario).then(
      (vehiculosPorPropietario) => {
        set({ vehiculos: vehiculosPorPropietario });
        if (vehiculosPorPropietario.length === 1)
          set({ vehiculo: vehiculosPorPropietario[0] });
      }
    );
  },
  obtenerVehiculosPorNombre: (nombre: string) => {
    getVehiculosPorNombre(nombre).then((vehiculos) => {
      set({ vehiculos: vehiculos });
      if (vehiculos.length === 1) set({ vehiculo: vehiculos[0] });
      const conductor = useConductorStore.getState().conductor;
      console.log(conductor);
      if (conductor) {
        console.log(conductor);
        set({
          vehiculo: vehiculos.find((v) => v.id_propietario === conductor.id),
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
      .vehiculos.find((v) => v.id_propietario === id);
    set({ vehiculo: vehiculo });
  },
  limpiarVehiculo: () => {
    set({ vehiculo: null });
    //traer todos los vehiculos
    useVehiculoStore.getState().obtenerVehiculos();
  },
}));
