import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "./utils/util";

type propss = {
  Onclick: (e: string) => void,
  Lable: string
};

export default function Button({ Onclick, Lable }: propss) {
  const [Show, setShow] = useState(false);
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ backgroundColor: "rgba(var(--primary))", scale: 0.95 }}
      exit={{ scale: 1 }}
      onClick={() => {
        setShow(true);
        Onclick;
        setShow(false);
      }}
      className={cn(
        "bg-Secondary rounded-md w-52 p-2 m-2",
        Show ? "opacity-20" : "opacity-100"
      )}
      disabled={Show}
    >
      {Lable}
    </motion.button>
  );
}
