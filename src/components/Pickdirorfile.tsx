import { invoke } from "@tauri-apps/api/core";
import { AnimatePresence, motion } from "motion/react";
import React, { Dispatch, SetStateAction } from "react";
import { FaFolderOpen, FaImage } from "react-icons/fa6";

interface Pickdirorfileprops {
  Setvalue: Dispatch<SetStateAction<string>>;
  value?: string;
  file?: boolean;
  body?: React.ReactNode | string;
}

export default function Pickdirorfile({
  Setvalue,
  file = false,
  body,
}: Pickdirorfileprops) {
  return file ? (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        exit={{ scale: 1 }}
        onClick={() => {
          invoke("getfile").then((data) => Setvalue(data as string));
        }}
      >
        {body || <FaImage className="cursor-pointer" />}
      </motion.div>
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        exit={{ scale: 1 }}
        onClick={() => {
          invoke("getfolder").then((data) => Setvalue(data as string));
        }}
      >
        {body || <FaFolderOpen className="cursor-pointer" />}
      </motion.div>
    </AnimatePresence>
  );
}
