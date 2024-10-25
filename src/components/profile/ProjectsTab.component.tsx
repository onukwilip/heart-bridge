import { TProject } from "@/utils/types";
import React, { FC } from "react";
import Project from "./Project.component";

const ProjectsTab: FC<{ projects: TProject[] }> = ({ projects }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {projects.map((project) => (
        <Project project={project} key={project.$id} />
      ))}
    </div>
  );
};

export default ProjectsTab;
