import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

// TypeScript Props Definition
type DropdownMenuProps = {
  label?: string; // Optional label for the dropdown
  options: string[]; // Array of dropdown options
  value: string; // Selected value
  setValue: (selectedValue: string) => void; // Handler for value changes
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label = "Select an option",
  options,
  value,
  setValue,
}) => {
  const [Custom, setCustom] = useState(false);
  const [Customvalue, setCustomvalue] = useState("");
  useEffect(() => {
    if (value == "Custom Format") {
      setCustom(true);
    } else {
      setCustom(false);
    }
  }, [value]);
  return (
    <div className="flex flex-col p-3 w-[40%]">
      {label && (
        <label className="mb-2 text-sm font-medium" htmlFor={label}>
          {label}
        </label>
      )}
      <select
        value={value}
        id={label}
        onChange={(e) => setValue(e.target.value)}
        className="w-full  p-2 bg-Secondary border rounded-md border-Secondary/30 focus:outline-none focus:ring-2 focus:ring-Accent hover:cursor-pointer"
      >
        <option className="hover:bg-Primary  w-36">Select Format</option>
        {options.map((option, index) => (
          <option key={index} value={option} className="hover:bg-Primary  w-36">
            {option}
          </option>
        ))}
        <option className="hover:bg-Primary  w-36">Custom Format</option>
      </select>

      {Custom ? (
        <>
          <div className="flex bg-Secondary items-center justify-center h-fit w-fit mt-2 rounded-lg ">
            <input
              type="text"
              onChange={(e) => setCustomvalue(e.target.value)}
              className="bg-Secondary p-2 rounded-lg w-full border border-Primary/20 focus:outline-none focus:ring-2 focus:ring-Accent"
            />
            <IoIosArrowForward
              className="text-2xl m-1"
              onClick={() => {
                Customvalue.startsWith(".")
                  ? setValue(Customvalue)
                  : setValue("." + Customvalue);
              }}
            />
          </div>
          <p className="text-xs text-center">
            The box will disappear once you confirm
          </p>
        </>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
