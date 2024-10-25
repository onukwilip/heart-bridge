import React, { FC } from "react";
import error403image from "@/images/403-image.png";
import Image from "next/image";

const Error403: FC<{ msg?: string }> = ({ msg }) => {
  return (
    <div className="w-full flex flex-col justify-center h-full items-center !text-white gap-3">
      <Image src={error403image.src} width={300} height={300} alt={"403"} />
      <span>{msg || "You are not authorized to view this page"}</span>
    </div>
  );
};

export default Error403;
