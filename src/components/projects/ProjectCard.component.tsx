import { TProject } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dummy_image from "@/images/dummy-image.jpg";

interface ProjectProps {
  project: TProject;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Link
      href={`projects/${project.$id}`}
      className="w-[80vw] flex flex-col xs:w-fit space-y-4 p-4 border-b-primary border-b-2 rounded-xl bg-white/10 duration-500 ease-in-out cursor-pointer hover:bg-white/5"
    >
      <div className="w-full xs:w-[inherit] h-[150px] overflow-hidden rounded-lg">
        <Image
          src={(project.images as string[])[0] || dummy_image.src}
          width={350}
          height={150}
          className="w-full xs:w-[350px] h-[150px] object-cover"
          alt={project.title}
        />
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
          {((project.current_amount / project.goal) * 100).toFixed(1)}%
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
