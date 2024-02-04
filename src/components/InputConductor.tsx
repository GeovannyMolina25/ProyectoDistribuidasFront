import { FC, useEffect, useState } from "react";
import { ControlCombustible } from "./RegistroForm";
import { Conductor } from "../interfaces/type";
import { useConductorStore } from "../store/ConductorStore";
import { useVehiculoStore } from "../store/VehiculoStore";

interface InputPropietarioProps {
  controlCombustible: ControlCombustible;
  setControlCombustible: (controlCombustible: ControlCombustible) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputConductor: FC<InputPropietarioProps> = ({
  controlCombustible,
  setControlCombustible,
  onChange,
}) => {
  const {
    vehiculo,
    obtenerVehiculosPorPropietario,
    establecerVehiculoPorConductor,
  } = useVehiculoStore();
  const { conductores, conductor, obtenerConductor, establecerConductor } =
    useConductorStore();
  const [isFocusPropietario, setIsFocusPropietario] = useState({
    isFocusInput: false,
    isFocusDropdown: false,
  });
  const handleSelectPropietario = (propietario: Conductor) => {
    establecerConductor(propietario);
    if (controlCombustible.vehiculo !== "") {
      establecerVehiculoPorConductor(propietario.id);
    }
    setControlCombustible({
      ...controlCombustible,
      conductor: propietario.nombre,
    });
    setIsFocusPropietario({
      ...isFocusPropietario,
      isFocusInput: false,
      isFocusDropdown: false,
    });

    obtenerVehiculosPorPropietario(propietario.id);
  };

  useEffect(() => {
    if (vehiculo) {
      obtenerConductor(vehiculo.id_propietario);
    }
  }, [vehiculo, obtenerConductor, conductores]);

  useEffect(() => {
    if (conductor) {
      setControlCombustible({
        ...controlCombustible,
        conductor: conductor.nombre,
      });
    }
  }, [conductor]);
  return (
    <>
      <input
        onFocus={() =>
          setIsFocusPropietario({
            ...isFocusPropietario,
            isFocusInput: true,
            isFocusDropdown: true,
          })
        }
        onBlur={() =>
          setIsFocusPropietario({
            ...isFocusPropietario,
            isFocusInput: false,
          })
        }
        type="text"
        name="propietario"
        id="propietario"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        value={controlCombustible.conductor}
        onChange={onChange}
        autoComplete="off"
      />
      <label
        htmlFor="propietario"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Conductor
      </label>
      {(isFocusPropietario.isFocusInput ||
        isFocusPropietario.isFocusDropdown) && (
        <div
          onFocus={() =>
            setIsFocusPropietario({
              ...isFocusPropietario,
              isFocusDropdown: true,
            })
          }
          onBlur={() =>
            setIsFocusPropietario({
              ...isFocusPropietario,
              isFocusDropdown: false,
            })
          }
          className="bg-transparent w-full max-h-36 overflow-y-auto absolute top-12 z-50 bg-white py-2 flex flex-col gap-2 rounded-md"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "dark",
            overflowY: "scroll",
          }}
        >
          {conductores.length > 0 ? (
            conductores.map((conductor) => (
              <button
                type="button"
                onClick={() => handleSelectPropietario(conductor)}
                key={conductor.id}
                className="flex justify-between hover:bg-slate-200 py-1 w-full px-2"
              >
                <span>{conductor.nombre}</span>
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
