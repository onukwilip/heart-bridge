import NextTopLoader from "nextjs-toploader";
import React, { FC, ReactNode } from "react";

const Authlayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <NextTopLoader color="#007AFF" />
    </>
  );
};

export default Authlayout;
