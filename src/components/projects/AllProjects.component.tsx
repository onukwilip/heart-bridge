import { fakeProjects } from "@/utils/constants";
import React from "react";
import ProjectCard from "./ProjectCard.component";

const AllProjects = () => {
  return (
    <div className="grid md:grid-cols-3 w-full gap-10 place-items-center lg:grid-cols-4">
      {Array.from(
        [1, 2, 3, 4, 5, 6, 7, 8].map((project) => (
          <ProjectCard project={fakeProjects[0]} />
        ))
      )}
    </div>
  );
};

export default AllProjects;
