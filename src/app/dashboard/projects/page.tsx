import AllProjects from "@/components/projects/AllProjects.component";
import TitleRow from "@/components/projects/TitleRow.component";
import React from "react";

const Projects = () => {
  return (
    <div className="flex flex-col space-y-14 w-full">
      {/* Title + New project */}
      <TitleRow />

      {/* PRojects Grid */}
      <AllProjects />
    </div>
  );
};

export default Projects;
