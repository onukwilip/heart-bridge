"use client";

import { useParams } from "next/navigation";
import React from "react";

const ProjectDetail = () => {
  const { projectID } = useParams();
  return <div>ProjectDetail</div>;
};

export default ProjectDetail;
