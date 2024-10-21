import React from "react";
import dynamic from "next/dynamic";
import AllProjects from "@/components/projects/AllProjects.component";
import RouteProtector from "@/components/RouteProtector.component";

const TitleRow = dynamic(
  () => import("@/components/projects/TitleRow.component"),
  {
    ssr: false,
  }
);

const Projects = () => {
  return (
    <RouteProtector role="orphanage">
      <div className="flex flex-col gap-8 w-full">
        {/* Title + New project */}
        <TitleRow />
        {/* Projects Grid */}
        <AllProjects />
      </div>
    </RouteProtector>
  );
};

export default Projects;
