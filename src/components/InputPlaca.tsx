import { FC, useEffect, useState } from "react";
import { ControlCombustible } from "../interfaces/type";
import { Vehiculo } from "../interfaces/type";
import { useVehiculoStore } from "../store/VehiculoStore";

interface InputPropietarioProps {
  controlCombustible: ControlCombustible;
  setControlCombustible: (controlCombustible: ControlCombustible) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPlaca: FC<InputPropietarioProps> = ({
  controlCombustible,
  setControlCombustible,
  onChange,
}) => {
  const [isFocusPlaca, setIsPlaca] = useState({
    isFocusInput: false,
    isFocusDropdown: false,
  });
  const handleSelectPlaca = (vehiculo: Vehiculo) => {
    setControlCombustible({
      ...controlCombustible,
      placa: vehiculo.placa,
    });
    obtenerVehiculoPorPlaca(vehiculo.placa);
    setIsPlaca({
      ...isFocusPlaca,
      isFocusInput: false,
      isFocusDropdown: false,
    });
  };
  const { vehiculos, obtenerVehiculoPorPlaca, vehiculo } = useVehiculoStore();

  useEffect(() => {
    if (vehiculo) {
      console.log(vehiculo);
      setControlCombustible({
        ...controlCombustible,
        placa: vehiculo.placa,
        vehiculo: vehiculo.vehiculo,
      });
    }
  }, [vehiculo]);
  return (
    <>
      <input
        onFocus={() =>
          setIsPlaca({
            ...isFocusPlaca,
            isFocusInput: true,
            isFocusDropdown: true,
          })
        }
        onBlur={() =>
          setIsPlaca({
            ...isFocusPlaca,
            isFocusInput: false,
          })
        }
        type="text"
        name="placa"
        id="placa"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        value={controlCombustible.placa}
        onChange={onChange}
        autoComplete="off"
      />
      <label
        htmlFor="placa"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Placa
      </label>
      {(isFocusPlaca.isFocusDropdown || isFocusPlaca.isFocusInput) && (
        <div
          onFocus={() =>
            setIsPlaca({
              ...isFocusPlaca,
              isFocusDropdown: true,
              isFocusInput: false,
            })
          }
          onBlur={() =>
            setIsPlaca({
              ...isFocusPlaca,
              isFocusDropdown: false,
              isFocusInput: false,
            })
          }
          className="bg-transparent w-full max-h-36 overflow-y-auto absolute top-12 z-40 bg-white py-2 flex flex-col gap-2 rounded-md"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "dark",
            overflowY: "scroll",
          }}
        >
          {vehiculos.length > 0 ? (
            vehiculos.map((vehiculo) => (
              <button
                key={vehiculo.id_vehiculo}
                className="flex justify-between hover:bg-slate-200 py-1 w-full px-2"
                onClick={() => handleSelectPlaca(vehiculo)}
              >
                <span>{vehiculo.placa}</span>
              </button>
            ))
          ) : (
            <>No hay vehiculos registrados</>
          )}
        </div>
      )}
    </>
  );
};
