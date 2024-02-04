import { useVehiculoStore } from "../store/VehiculoStore";

export const useRegistroForm = () => {
  const vehiculos = useVehiculoStore((state) => state.vehiculos);

  const placas = vehiculos.map((v) => v.placa);
  const nombres = vehiculos.map((v) => v.vehiculo);

  const optionsPlacas = placas.map((p) => ({ value: p, label: p }));
  const optionsNombres = nombres.map((n) => ({ value: n, label: n }));

  return {
    optionsPlacas,
    optionsNombres,
  };
};
