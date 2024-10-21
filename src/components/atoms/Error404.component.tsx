import React, { FC } from "react";
import error_404_image from "@/images/404-image.png";
import Image from "next/image";

const Error404: FC<{ msg: string }> = ({ msg }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        width={300}
        height={300}
        src={error_404_image.src}
        alt="404"
        className="w-full max-w-[300px]"
      />
      <span className="!text-primary-grey text-xl">{msg}</span>
    </div>
  );
};

export default Error404;
