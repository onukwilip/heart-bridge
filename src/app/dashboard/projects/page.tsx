import AllProjects from "@/components/projects/AllProjects.component";
import TitleRow from "@/components/projects/TitleRow.component";
import React from "react";

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
