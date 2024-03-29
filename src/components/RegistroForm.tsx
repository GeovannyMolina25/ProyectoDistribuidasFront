import { useState } from "react";
import { InputCustom } from "./InputCustom";
import { ControlCombustible, Ubicacion } from "../interfaces/type";
import { InputConductor } from "./InputConductor";
import { InputPlaca } from "./InputPlaca";
import { InputVehiculo } from "./InputVehiculo";
import { useUbicacionStore } from "../store/UbicacionStore";
import { Toaster, toast } from "sonner";
import {
  getKilometroPorGalon,
  getKilometroPorMoneda,
  getKilometroRecorrido,
} from "../helpers/getCalculos";
import trash from "../assets/trash.svg";
import { useConductorStore } from "../store/ConductorStore";
import { useVehiculoStore } from "../store/VehiculoStore";
import { postControlCombustible } from "../services/controlCombustible.service";
export const RegistroForm = () => {
  const [isFocusOrigen, setIsFocusOrigen] = useState({
    isFocusInput: false,
    isFocusDropdown: false,
  });
  const { limpiarConductor } = useConductorStore();
  const { limpiarVehiculo } = useVehiculoStore();
  const [isFocusDestino, setIsFocusDestino] = useState({
    isFocusInput: false,
    isFocusDropdown: false,
  });

  const { ubicaciones, establecerUbicacion, ubicacion, ubicacionesRepetidas } =
    useUbicacionStore();
  const { vehiculo } = useVehiculoStore();
  const [controlCombustible, setControlCombustible] =
    useState<ControlCombustible>({
      date: "",
      placa: "",
      vehiculo: "",
      conductor: "",
      origenUbicacion: "",
      destinoUbicacion: "",
      kmInicial: 0,
      kmFinal: 0,
      kmRecorridos: 0,
      galon: 0,
      valorCompra: 0,
      kmPorGalon: 0,
      KmPorMoneda: 0,
      tipoCombustible: "",
      NumeroDocumento: "",
      comentario: "",
    });
  const handleSelectDestino = (ubicacion: Ubicacion) => {
    establecerUbicacion(ubicacion);
    setControlCombustible({
      ...controlCombustible,
      destinoUbicacion: ubicacion.destino,
    });
    setIsFocusDestino({
      ...isFocusDestino,
      isFocusInput: false,
      isFocusDropdown: false,
    });
  };
  const handleSelectOrigen = (ubicacion: Ubicacion) => {
    establecerUbicacion(ubicacion);
    setControlCombustible({
      ...controlCombustible,
      origenUbicacion: ubicacion.origen,
    });
    setIsFocusOrigen({
      ...isFocusOrigen,
      isFocusInput: false,
      isFocusDropdown: false,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataEnviar = {
      fecha_control: controlCombustible.date,
      id_vehiculo: vehiculo?.id_vehiculo,
      descripcion_veh: controlCombustible.vehiculo,
      id_ubicacion: ubicacion?.id_ubicacion,
      km_inicial_controlc: controlCombustible.kmInicial,
      km_final_controlc: controlCombustible.kmFinal,
      km_galon_controlc: controlCombustible.kmPorGalon,
      km_moneda_controlc: controlCombustible.KmPorMoneda,
      km_recorrido_controlc: controlCombustible.kmRecorridos,
      galon_controlc: controlCombustible.galon,
      valorcompra_controlc: controlCombustible.valorCompra,
      id_combustible: 1,
      no_documento_controlc: controlCombustible.NumeroDocumento,
      comentario_controlc: controlCombustible.comentario,
    };
    toast.promise(postControlCombustible(dataEnviar), {
      loading: "Loading...",
      success: () => {
        resetFormulario();
        return `Registro Control Combustible exitoso`;
      },
      error: "Error al registrar el control de combustible",
    });
  };
  const handleClearVehiculoConductor = () => {
    limpiarConductor();
    limpiarVehiculo();
    setControlCombustible({
      ...controlCombustible,
      conductor: "",
      vehiculo: "",
      placa: "",
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setControlCombustible({
      ...controlCombustible,
      [name]: String(value),
    });
    if (!isNaN(0.01)) {
      if (name === "kmInicial") {
        setControlCombustible({
          ...controlCombustible,
          [name]: parseFloat(value),
          kmRecorridos: getKilometroRecorrido(
            parseFloat(value),
            controlCombustible.kmFinal
          ),
          kmPorGalon: getKilometroPorGalon(
            controlCombustible.kmRecorridos || 0,
            controlCombustible.kmPorGalon || 0
          ),
          KmPorMoneda: getKilometroPorMoneda(
            controlCombustible.kmRecorridos || 0,
            controlCombustible.valorCompra || 0
          ),
        });
      } else if (name === "kmFinal") {
        setControlCombustible({
          ...controlCombustible,
          [name]: parseFloat(value),
          kmRecorridos: getKilometroRecorrido(
            controlCombustible.kmInicial,
            parseFloat(value)
          ),
          kmPorGalon: getKilometroPorGalon(
            controlCombustible.kmRecorridos,
            controlCombustible.galon
          ),
          KmPorMoneda: getKilometroPorMoneda(
            controlCombustible.kmRecorridos,
            controlCombustible.valorCompra
          ),
        });
      } else if (name === "galon") {
        setControlCombustible({
          ...controlCombustible,
          [name]: parseFloat(value),
          kmPorGalon: getKilometroPorGalon(
            controlCombustible.kmRecorridos,
            parseFloat(value)
          ),
        });
      } else if (name === "valorCompra") {
        setControlCombustible({
          ...controlCombustible,
          [name]: parseFloat(value),
          KmPorMoneda: getKilometroPorMoneda(
            controlCombustible.kmRecorridos,
            parseFloat(value)
          ),
        });
      }
    }
  };
  const resetFormulario = () => {
    limpiarConductor();
    limpiarVehiculo();
    setControlCombustible({
      date: "",
      placa: "",
      vehiculo: "",
      conductor: "",
      origenUbicacion: "",
      destinoUbicacion: "",
      kmInicial: 0,
      kmFinal: 0,
      kmRecorridos: 0,
      galon: 0,
      valorCompra: 0,
      kmPorGalon: 0,
      KmPorMoneda: 0,
      tipoCombustible: "",
      NumeroDocumento: "",
      comentario: "",
    });
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setControlCombustible({
      ...controlCombustible,
      [name]: value,
    });
  };
  return (
    <form
      className="grid grid-cols-6 gap-2 mx-auto max-w-3xl text-left mt-8 relative items-center"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full z-10 mb-5 group col-span-3">
        <InputCustom
          label="Fecha"
          type="date"
          name="date"
          id="date"
          required
          value={controlCombustible.date}
          onChange={onChange}
        />
      </div>
      <div className="col-span-3"></div>
      <div className="relative w-full z-40 mb-5 group col-span-2">
        <InputPlaca
          controlCombustible={controlCombustible}
          setControlCombustible={setControlCombustible}
          onChange={onChange}
        />
      </div>
      <div className="relative w-full z-50 mb-5 group col-span-2">
        <InputConductor
          controlCombustible={controlCombustible}
          setControlCombustible={setControlCombustible}
          onChange={onChange}
        />
      </div>

      <div className="relative w-full z-40 mb-5 group col-span-2">
        <InputVehiculo
          controlCombustible={controlCombustible}
          setControlCombustible={setControlCombustible}
          onChange={onChange}
        />
        <div
          className="w-4 h-4 absolute right-0 top-0 cursor-pointer "
          onClick={handleClearVehiculoConductor}
        >
          <img src={trash} alt="" />
        </div>
      </div>
      <div className="relative w-full z-30 mb-5 group col-span-3">
        <input
          onFocus={() =>
            setIsFocusOrigen({
              ...isFocusOrigen,
              isFocusInput: true,
              isFocusDropdown: true,
            })
          }
          onBlur={() =>
            setIsFocusOrigen({
              ...isFocusOrigen,
              isFocusInput: false,
            })
          }
          type="text"
          value={controlCombustible.origenUbicacion || ""}
          onChange={onChange}
          name="origenUbicacion"
          id="origenUbicacion"
          autoComplete="off"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="origenUbicacion"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Origen
        </label>
        {(isFocusOrigen.isFocusDropdown || isFocusOrigen.isFocusInput) && (
          <div
            className="bg-transparent w-full max-h-36 overflow-y-auto absolute top-12 z-30 bg-white py-2 flex flex-col gap-2 rounded-md"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "dark",
              overflowY: "scroll",
            }}
          >
            {ubicaciones.length > 0 ? (
              ubicaciones.map((ubicacion) => (
                <button
                  type="button"
                  onClick={() => handleSelectOrigen(ubicacion)}
                  key={ubicacion.id_ubicacion}
                  className="flex justify-between hover:bg-slate-200 py-1 w-full px-2"
                >
                  <span>{ubicacion.origen}</span>
                </button>
              ))
            ) : (
              <>No hay vehiculos registrados</>
            )}
          </div>
        )}
      </div>
      <div className="relative w-full z-30 mb-5 group col-span-3">
        <input
          disabled={ubicacion === null}
          onFocus={() =>
            setIsFocusDestino({
              ...isFocusDestino,
              isFocusInput: true,
              isFocusDropdown: true,
            })
          }
          onBlur={() =>
            setIsFocusDestino({
              ...isFocusDestino,
              isFocusInput: false,
            })
          }
          type="text"
          name="destinoUbicacion"
          id="destinoUbicacion"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          required
          value={controlCombustible.destinoUbicacion}
          onChange={onChange}
        />
        <label
          htmlFor="destinoUbicacion"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Destino
        </label>
        {(isFocusDestino.isFocusDropdown || isFocusDestino.isFocusInput) && (
          <div
            className="bg-transparent w-full max-h-36 overflow-y-auto absolute top-12 z-30 bg-white py-2 flex flex-col gap-2 rounded-md"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "dark",
              overflowY: "scroll",
            }}
          >
            {ubicacionesRepetidas.length > 0 ? (
              ubicacionesRepetidas
                .filter((ubi) => ubi.origen === ubicacion?.origen)
                .map((ubicacion) => (
                  <button
                    onClick={() => handleSelectDestino(ubicacion)}
                    key={ubicacion.id_ubicacion}
                    className="flex justify-between hover:bg-slate-200 py-1 w-full px-2"
                  >
                    <span>{ubicacion.destino}</span>
                  </button>
                ))
            ) : (
              <>No hay vehiculos registrados</>
            )}
          </div>
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group col-span-2">
        <InputCustom
          label="KM Inicial"
          type="number"
          name="kmInicial"
          id="kmInicial"
          step="0.01"
          required
          value={controlCombustible.kmInicial}
          onChange={onChange}
        />
      </div>
      <div className="relative z-0 w-full mb-5 group col-span-2">
        <InputCustom
          label="KM Final"
          type="number"
          name="kmFinal"
          id="kmFinal"
          step="0.01"
          required
          value={controlCombustible.kmFinal}
          onChange={onChange}
        />
      </div>

      <div className="relative w-full z-10 mb-5 group col-span-2">
        <InputCustom
          label="KM Recorridos"
          type="number"
          name="kmRecorridos"
          id="kmRecorridos"
          step="0.01"
          required
          value={controlCombustible.kmRecorridos}
          onChange={onChange}
        />
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-1">
        <InputCustom
          label="Galon"
          type="number"
          name="galon"
          id="galon"
          required
          value={controlCombustible.galon}
          onChange={onChange}
        />
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-1">
        <InputCustom
          label="Valor Compra"
          type="number"
          name="valorCompra"
          id="valorCompra"
          required
          value={controlCombustible.valorCompra}
          onChange={onChange}
          step="0.01"
        />
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-1">
        <InputCustom
          label="KM por Galon"
          type="number"
          name="kmPorGalon"
          id="kmPorGalon"
          required
          value={controlCombustible.kmPorGalon}
          onChange={onChange}
          step="0.01"
        />
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-1">
        <InputCustom
          label="KM por Moneda"
          type="number"
          name="KmPorMoneda"
          id="KmPorMoneda"
          required
          value={controlCombustible.KmPorMoneda}
          onChange={onChange}
          step="0.01"
        />
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-2">
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          defaultValue={controlCombustible.tipoCombustible}
          onChange={onSelect}
          name="tipoCombustible"
        >
          <option defaultValue={""}>Tipo de Combustible</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Diesel">Diesel</option>
          <option value="Electrico">Electrico</option>
        </select>
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-1">
        <InputCustom
          label="No Documento"
          type="string"
          name="NumeroDocumento"
          id="NumeroDocumento"
          required
          value={controlCombustible.NumeroDocumento}
          onChange={onChange}
        />
      </div>
      <div className="relative w-full z-10 mb-5 group col-span-5">
        <InputCustom
          label="Comentario"
          type="string"
          name="comentario"
          id="comentario"
          required
          value={controlCombustible.comentario}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        className="text-white col-span-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/2 m-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <Toaster />
    </form>
  );
};
