import React from "react";
import dynamic from "next/dynamic";
import AllProjects from "@/components/projects/AllProjects.component";

const TitleRow = dynamic(
  () => import("@/components/projects/TitleRow.component"),
  {
    ssr: false,
  }
);

const Projects = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title + New project */}
      <TitleRow />
      {/* Projects Grid */}
      <AllProjects />
    </div>
  );
};

export default Projects;
