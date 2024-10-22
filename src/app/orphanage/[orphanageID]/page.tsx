import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { orphanageID } = useParams();
  return <div className="flex flex-col"></div>;
};

export default page;
