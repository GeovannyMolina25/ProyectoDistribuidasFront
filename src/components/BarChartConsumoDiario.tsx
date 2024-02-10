import { FC } from "react";
import { controlCombustibleVehiculoDia } from "../interfaces/type";
import { BarChart } from "@tremor/react";
interface BarChartConsumoDiarioProps {
  data: controlCombustibleVehiculoDia[];
}
export const BarChartConsumoDiario: FC<BarChartConsumoDiarioProps> = ({
  data,
}) => {
  console.log(data);
  const datos = data.map((item) => {
    return {
      nombre: ` (${item.placa_vehh}) ${item.descripcion_vehh}`,
      "Consumo Combustible km/Gln": item.total_km_galon,
    };
  });
  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();
  return (
    <div>
      <BarChart
        data={datos}
        index="nombre"
        categories={["Consumo Combustible km/Gln"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        showXAxis={true}
        onValueChange={(v) => console.log(v)}
        rotateLabelX={{ angle: 90, xAxisHeight: 100, verticalShift: 70 }}
        style={{ fontSize: "5px" }}
      />
    </div>
  );
};
