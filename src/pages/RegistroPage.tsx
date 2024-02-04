import { RegistroForm } from "../components/RegistroForm";
import { useConductorStore } from "../store/ConductorStore";
import { useEffect } from "react";
import { useVehiculoStore } from "../store/VehiculoStore";
import { useUbicacionStore } from "../store/UbicacionStore";

export const RegistroPage = () => {
  const { obtenerConductores } = useConductorStore();
  const { obtenerVehiculos } = useVehiculoStore();
  const { obtenerUbicaciones, obtenerUbicacionesRepetidas } =
    useUbicacionStore();

  useEffect(() => {
    obtenerConductores();
    obtenerVehiculos();
    obtenerUbicaciones();
    obtenerUbicacionesRepetidas();
  }, [
    obtenerConductores,
    obtenerVehiculos,
    obtenerUbicaciones,
    obtenerUbicacionesRepetidas,
  ]);

  return (
    <div className="mt-10">
      <h1 className="text-center font-bold md:text-3xl sm:text-xl">
        Formulario Registro
      </h1>
      <RegistroForm />
    </div>
  );
};
