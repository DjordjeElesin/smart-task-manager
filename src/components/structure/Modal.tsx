import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "motion/react";

type ModalPropsType = {
  toggleModal: (event: any) => void;
  children: React.ReactNode;
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 30,
      stiffness: 400,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function Modal({ toggleModal, children }: ModalPropsType) {
  return (
    <Backdrop onClick={toggleModal}>
      <motion.div
        className="rounded-xl p-6 bg-white"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}
