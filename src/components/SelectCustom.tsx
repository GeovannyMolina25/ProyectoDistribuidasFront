import { FC, useEffect } from "react";
import Select from "react-select";
interface SelectCustomProps {
  options: { value: string; label: string }[];
}
export const SelectCustom: FC<SelectCustomProps> = ({ options }) => {
  useEffect(() => {
    console.log("SelectCustom mounted");
    return () => {
      console.log("SelectCustom unmounted");
    };
  }, []);
  return (
    <div>
      <Select
        options={options}
        isSearchable={true}
        isClearable={true}
        value={options[0] === undefined ? null : options[0]}
      />
    </div>
  );
};
