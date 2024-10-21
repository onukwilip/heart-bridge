import React from "react";
import ProjectDetail from "@/components/projects/ProjectDetail.component";
import RouteProtector from "@/components/RouteProtector.component";

const ProjectDetailPage = () => {
  return (
    <RouteProtector role="orphanage">
      <ProjectDetail />
    </RouteProtector>
  );
};

export default ProjectDetailPage;
