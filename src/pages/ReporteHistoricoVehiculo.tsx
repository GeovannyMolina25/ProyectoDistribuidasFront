import { useEffect } from "react";
import { useVehiculoStore } from "../store/VehiculoStore";
import { useControlCombustibleStore } from "../store/ControlCombustibleSotre";
import { Button } from "@tremor/react";
import { AreaCharkilometroRecorrido } from "../components/AreaChartKilometroRecorrdido";
import { Vehiculo } from "../interfaces/type";

export const ReporteHistoricoVehiculo = () => {
  const {
    vehiculos,
    obtenerVehiculosControlCombustible,
    vehiculo,
    establecerVehiculo,
  } = useVehiculoStore();
  const {
    obtenerKilometrosRecorridosByVehculoPlaca,
    kilometrosRecorridosControlCombustible,
  } = useControlCombustibleStore();
  useEffect(() => {
    obtenerVehiculosControlCombustible();
    console.log();
  }, [obtenerVehiculosControlCombustible]);

  const handlePlacaVehiculo = (vehiculo: Vehiculo) => {
    obtenerKilometrosRecorridosByVehculoPlaca(vehiculo.placa);
    establecerVehiculo(vehiculo);
  };

  return (
    <div className="h-[calc(100%-20px)]">
      <h1 className="text-center font-bold text-3xl mt-8">
        Reporte Promedio Diario Kilometros Recorridos
      </h1>
      <div className="grid grid-cols-9 grid-rows-6 gap-3 gap-y-3 h-3/4 mt-4 mx-4">
        <div className="col-span-2 row-span-6 border-2 border-[#0e2a47] rounded-lg flex flex-col gap-3 py-5 px-5 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {vehiculos !== undefined && vehiculos.length > 0 ? (
              vehiculos.map((vehicul) => (
                <Button
                  key={vehicul.id_vehiculo}
                  className={`bg-[#0e2a47] text-white rounded-md px-4 py-1
                  ${vehiculo?.placa === vehicul.placa ? "bg-[#1d4ed8]" : ""}
                  `}
                  onClick={() => handlePlacaVehiculo(vehicul)}
                >
                  {vehicul.placa}
                </Button>
              ))
            ) : (
              <p>No hay conductores</p>
            )}
          </div>
        </div>

        <div className="col-span-7 row-span-7 border-2 border-[#0e2a47] bg-white rounded-lg ">
          <AreaCharkilometroRecorrido
            data={kilometrosRecorridosControlCombustible!}
          />
        </div>
      </div>
    </div>
  );
};
