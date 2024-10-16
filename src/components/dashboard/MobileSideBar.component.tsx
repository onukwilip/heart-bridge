import React, { FC, ReactNode } from "react";
import { HTMLMotionProps, motion, Variants } from "framer";
import Sidebar from "./Sidebar.component";

const MobileSideBar: FC<HTMLMotionProps<"div">> = (props) => {
  const variants: Variants = {
    far: {
      x: -200,
    },
    near: {
      x: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      className="fixed top-0 left-0 z-50 bg-black h-full lg:hidden"
      {...props}
    >
      <Sidebar />
    </motion.div>
  );
};

export default MobileSideBar;
