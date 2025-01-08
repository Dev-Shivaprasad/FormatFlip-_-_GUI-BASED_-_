import { CiSquareRemove } from "react-icons/ci";
import Pickdirorfile from "./Pickdirorfile";
import { motion } from "motion/react";
// import Button from "./Button";

type Props = {
  htmlFor: string;
  LabelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  imageinreq?: boolean;
};

export default function Inputbox({
  htmlFor,
  LabelText = "Path",
  imageinreq = true,
  setValue,
  value,
}: Props) {
  return (
    <div className="flex border m-3 p-3 rounded-md border-dashed border-Primary/40 items-center w-[90%] overflow-hidden">
      <div className="bg-Secondary rounded-lg flex justify-center items-center w-full">
        <input
          type="text"
          autoComplete="off"
          placeholder={LabelText}
          value={value}
          onChange={(e) => setValue(e.target.value)} // Correctly updates state
          id={htmlFor}
          className="bg-Secondary rounded-lg p-2 w-full border border-Primary/20 focus:outline-none focus:ring-2 focus:ring-Accent"
        />
        <div className="flex mx-5 space-x-5 justify-around items-center">
          <Pickdirorfile Setvalue={setValue} />
          {imageinreq ? (
            <Pickdirorfile Setvalue={setValue} file={true} />
          ) : (
            <div className="h-2 w-2 m-5"/>
          )}
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            exit={{ scale: 1 }}
            onClick={() => setValue("")} // Clears the value
          >
            <CiSquareRemove className="m-2 text-xl font-bold cursor-pointer" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
