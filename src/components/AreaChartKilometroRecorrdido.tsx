import { FC } from "react";
import { kilometrosRecorridsControlCombustible } from "../interfaces/type";
import { AreaChart } from "@tremor/react";
interface AreaCharKilometroRecorridoProps {
  data: kilometrosRecorridsControlCombustible[];
}
export const AreaCharkilometroRecorrido: FC<
  AreaCharKilometroRecorridoProps
> = ({ data }) => {
  console.log(data);
  const datos = data.map((item) => {
    return {
      fecha: ` (${item.fecha_control})`,
      "km Totales": item.km_total,
    };
  });
  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();
  return (
    <div>
      <AreaChart
        data={datos}
        index="fecha"
        categories={["km Totales"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        showXAxis={true}
        onValueChange={(v) => console.log(v)}
        rotateLabelX={{ angle: 90, xAxisHeight: 100, verticalShift: 70 }}
        style={{ fontSize: "5px" }}
        showAnimation={true}
        showTooltip={true}
      />
    </div>
  );
};
