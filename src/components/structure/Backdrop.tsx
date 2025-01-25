import { motion } from "motion/react";

type BackdropPropsType = {
  onClick: (event: any) => void;
  children: React.ReactNode;
};

export default function Backdrop({ onClick, children }: BackdropPropsType) {
  return (
    <motion.div
      className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
