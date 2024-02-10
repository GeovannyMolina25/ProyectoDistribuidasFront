import { create } from "zustand";

import {
  controlCombustibleDashboardDia,
  controlCombustibleVehiculoDia,
  kilometrosRecorridsControlCombustible,
} from "../interfaces/type";
import {
  getControlCombustibleDashboardDia,
  getControlCombustiblePorFechaConductor,
  getControlCombustibleVehiculoDia,
  getKilomentroosRecorridosByVehculoPlaca,
} from "../services/controlCombustible.service";

interface ControlCombustibleState {
  controlCombustibleDashboardDia: controlCombustibleDashboardDia | null;
  controlCombustibleVehiculoDia: controlCombustibleVehiculoDia[];
  kilometrosRecorridosControlCombustible: kilometrosRecorridsControlCombustible[];
  obtenerControlCombustibleDashboardDia: (fecha: string) => void;
  obtenerControlCombustibleVehiculoDia: (fecha: string) => void;
  obtenerKilometrosRecorridosByVehculoPlaca: (placa: string) => void;
  obtenerControlCombustiblePorFechaConductor: (
    fecha: string,
    id_conductor: number
  ) => void;
  limpiarControlCombustible: () => void;
}

export const useControlCombustibleStore = create<ControlCombustibleState>(
  (set) => ({
    controlCombustibleDashboardDia: null,
    controlCombustibleVehiculoDia: [],
    kilometrosRecorridosControlCombustible: [],
    obtenerControlCombustibleDashboardDia: (fecha: string) => {
      getControlCombustibleDashboardDia(fecha).then(
        (controlCombustibleDashboardDia) => {
          set({ controlCombustibleDashboardDia });
        }
      );
    },
    obtenerControlCombustibleVehiculoDia: (fecha: string) => {
      getControlCombustibleVehiculoDia(fecha).then(
        (controlCombustibleVehiculoDia) => {
          if (controlCombustibleVehiculoDia === undefined) {
            set({ controlCombustibleVehiculoDia: [] });
          } else {
            set({ controlCombustibleVehiculoDia });
          }
        }
      );
    },
    obtenerControlCombustiblePorFechaConductor: (
      fecha: string,
      id_conductor: number
    ) => {
      getControlCombustiblePorFechaConductor(fecha, id_conductor).then(
        (controlCombustibleVehiculoDia) => {
          set({ controlCombustibleVehiculoDia });
        }
      );
    },

    limpiarControlCombustible: () => {
      set({ controlCombustibleDashboardDia: null });
      set({ controlCombustibleVehiculoDia: [] });
    },
    obtenerKilometrosRecorridosByVehculoPlaca: (placa: string) => {
      getKilomentroosRecorridosByVehculoPlaca(placa).then(
        (kilometrosRecorridosControlCombustible) => {
          set({ kilometrosRecorridosControlCombustible });
        }
      );
    },
  })
);
