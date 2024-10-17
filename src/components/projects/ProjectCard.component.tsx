import { Project } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Link
      href={`projects/${project.id}`}
      className="flex flex-col w-full space-y-4 p-4 border-b-primary border-b-2 rounded-xl bg-white/10 duration-500 ease-in-out cursor-pointer hover:bg-white/5"
    >
      <div className="rounded-lg overflow-hidden">
        <Image src={project.image} className="w-full" alt={project.title} />
      </div>
      <div className="space-y-1">
        <p className="text-xs">
          {project.status == "active"
            ? "Currently Active"
            : project.status == "completed"
            ? "Completed"
            : "Draft"}
        </p>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="text-xs">
          Funding Progress{" "}
          {((project.currentAmount / project.targetAmount) * 100).toFixed(1)}%
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
