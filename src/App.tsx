import { useEffect, useState } from "react";
import Inputbox from "./components/Inputbox";
import DropdownMenu from "./components/Dropdown";
import { invoke } from "@tauri-apps/api/core";
import { cn } from "./components/utils/util";
import { motion } from "motion/react";
import toast, { Toaster } from "react-hot-toast";
export default function App() {
  const [Input, setInput] = useState("");
  const [Output, setOutput] = useState("");
  const [Threads, setThreads] = useState<number>();
  const [Inputformat, setInputformat] = useState("");
  const [Outputformat, setOutputformat] = useState("");
  const [Show, setShow] = useState(false);
  const [Checked, setChecked] = useState(true);
  const Inputoptions = [
    ".CR2",
    ".CR3",
    ".NEF",
    ".ARW",
    ".ORF",
    ".RAF",
    ".DNG",
    ".RW2",
    ".PEF",
    ".SR2",
    ".KDC",
    ".3FR",
    ".X3F",
    ".PXR",
    ".TIFF",
  ];
  const Outputoptions = [
    ".JPG",
    ".JPEG",
    ".PNG",
    ".GIF",
    ".BMP",
    ".TIFF",
    ".WEBP",
    ".ICO",
    ".EPS",
    ".PDF",
  ];
  const [Totalthreads, setTotalthreads] = useState<number>(4);
  useEffect(() => {
    invoke("numthreads").then((th) => {
      setThreads(th as number), setTotalthreads(th as number);
    });
  }, []);

  return (
    <div
      className="h-screen w-full bg-Background text-Text flex flex-col items-center justify-evenly"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className="text-2xl font-bold">{"Format Flipper".toUpperCase()}</div>
      <Inputbox
        htmlFor="Inputfolder"
        LabelText="INPUT FOLDER PATH"
        setValue={setInput}
        value={Input}
      />
      <Toaster
        toastOptions={{
          className: "toster",

          duration: 10000,
        }}
      />

      <Inputbox
        htmlFor="OutputFolder"
        imageinreq={false}
        LabelText="OUTPUT FOLDER PATH"
        setValue={setOutput}
        value={Output}
      />
      <div className="flex justify-center items-center w-full">
        <DropdownMenu
          setValue={setInputformat}
          options={Inputoptions}
          value={Inputformat}
          label="Input Format"
        />
        <DropdownMenu
          setValue={setOutputformat}
          options={Outputoptions}
          value={Outputformat}
          label="Output Format"
        />
      </div>
      <span>Currently Using threads : {Checked ? Totalthreads : Threads}</span>
      <input
        type="range"
        name=""
        id=""
        step={1}
        max={Totalthreads}
        min={4}
        value={Threads}
        minLength={Totalthreads}
        onChange={(e) => setThreads(parseInt(e.target.value))}
        className={cn("w-[70%] bg-Secondary text-Accent")}
        disabled={Checked}
      />
      <div className="flex justify-center items-center gap-5">
        <input
          type="checkbox"
          id="cb"
          checked={Checked}
          value={Totalthreads}
          onChange={() => setChecked(!Checked)}
          className="h-4 w-4 rounded-xl text-Accent bg-Secondary"
        />
        <label htmlFor="cb">DEFAULT : Uses all {Totalthreads} threads</label>
      </div>
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ backgroundColor: "rgba(var(--primary))", scale: 0.95 }}
        exit={{ scale: 1 }}
        onClick={() => {
          handlesubmit();
          // alert(
          //   Input +
          //     " --- " +
          //     Output +
          //     " --- " +
          //     Inputformat +
          //     " --- " +
          //     Outputformat +
          //     " --- " +
          //     Threads
          // );
        }}
        className={cn(
          "bg-Secondary rounded-md w-52 p-2 m-2",
          Show ? "opacity-20" : "opacity-100"
        )}
        disabled={Show}
      >
        {Show ? "Processing..." : "Start Processing"}
      </motion.button>
    </div>
  );

  async function handlesubmit() {
    try {
      if (!Input || !Output || !Inputformat || !Outputformat) {
        toast.error(
          "All fields (Input, Output, Inputformat, Outputformat) are required."
        );
        return;
      }
      if (Threads !== undefined && (isNaN(Threads) || Threads < 1)) {
        toast.error("Threads must be a valid positive number.");
        return;
      }
      setShow(true);

      await invoke("process_images", {
        inputdirectory: Input,
        outputdirectory: Output,
        inputformat: Inputformat,
        outputformat: Outputformat,
        numberofprocessors: Threads || 4,
      }).then((r) =>
        r ? toast.success("Image processing completed successfully!") : null
      );
      setShow(false);
    } catch (error) {
      setShow(false);
      toast.error(`Error during image processing ${error}`);
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "An unexpected error occurred";
      toast.error(`An error occurred: ${errorMessage}`);
    }
  }
}
