import { Button } from "@tremor/react";
import { useState } from "react";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { MdDriveEta } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
export const ReportePromedioDiario = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));
  const handleFecha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
  };
  return (
    <div className="h-[calc(100%-20px)]">
      <h1 className="text-center font-bold text-3xl mt-8">
        Reporte Promedio Diario
      </h1>
      <div className="mt-2 flex mx-10 justify-between items-center gap-4 w-1/4">
        <label htmlFor="fechaInicio">Fecha:</label>
        <input
          value={fecha}
          type="date"
          name="fecha"
          onChange={handleFecha}
          id="fecha"
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          required
        />
      </div>
      <div className="grid grid-cols-9 grid-rows-6 gap-3 gap-y-3 h-3/4 mt-4 mx-4">
        <div className="col-span-2 row-span-6 border-2 border-[#0e2a47] rounded-lg flex flex-col gap-3 py-5 px-5">
          <div className="flex flex-col gap-2">
            <Button className="bg-[#0e2a47] text-white rounded-md px-4 py-1">
              Alexander Q
            </Button>
            <Button className="bg-[#0e2a47] text-white rounded-md px-4 py-1">
              Nelson Molina
            </Button>
            <Button className="bg-[#0e2a47] text-white rounded-md px-4 py-1">
              Jean Pierre
            </Button>
            <Button
              size="xs"
              className="bg-[#0e2a47] text-white rounded-md px-4 py-1"
            >
              Erika Suntaxi
            </Button>
            <Button className="bg-[#0e2a47] text-white rounded-md px-4 py-1">
              Kenneth Toapanta
            </Button>
            <Button
              size="xs"
              className="bg-[#0e2a47] text-white rounded-md px-4 py-1"
            >
              Read more
            </Button>
          </div>
        </div>
        <div className="col-span-7 row-span-1  rounded-lg flex justify-between  gap-4 ">
          <div className="flex flex-col gap-1 bg-[#0e2a47] px-2 rounded-lg text-white font-bold justify-center items-center text-base w-full">
            <p>Consumo Glns</p>
            <div className="flex justify-center gap-4 items-center w-full">
              <BsFillFuelPumpDieselFill />
              <p>10.5</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 bg-[#0e2a47] px-2 rounded-lg text-white font-bold justify-center items-center text-base w-full">
            <p>Total Kilometros</p>
            <div className="flex justify-center gap-4 items-center w-full">
              <MdDriveEta />
              <p>10.5</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 bg-[#0e2a47] px-2 rounded-lg text-white font-bold justify-center items-center text-base w-full">
            <p>Promedio km/Gln</p>
            <div className="flex justify-center gap-4 items-center w-full">
              <BsFillFuelPumpDieselFill />
              <p>10.5</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 bg-[#0e2a47] px-2 rounded-lg text-white font-bold justify-center items-center text-base w-full">
            <p>Total Gastado</p>
            <div className="flex justify-center gap-4 items-center w-full">
              <GiMoneyStack className="text-2xl" />
              <p>10.5</p>
            </div>
          </div>
        </div>
        <div className="col-span-7 row-span-5 border-2 border-[#0e2a47] bg-white rounded-lg "></div>
      </div>
    </div>
  );
};
