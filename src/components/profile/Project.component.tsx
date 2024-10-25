"use client";
import { TProject } from "@/utils/types";
import Image from "next/image";
import React, { FC, useState } from "react";
import dummy_image from "@/images/dummy-image.jpg";
import Button from "../atoms/Button.component";
import { useRouter } from "next/navigation";
import TabSection from "../molecules/TabSection.component";
import FundingProgress from "../projects/FundingProgress.component";
import ProjectDetail from "../projects/ProjectDetail.component";
import { Drawer } from "@mui/material";

const Project: FC<{ project: TProject }> = ({ project }) => {
  const router = useRouter();
  const [show_sidedrawer, setShowSidedrawer] = useState(false);
  const [selected_image, setSelectedImage] = useState(
    (project?.images?.[0] as string) || dummy_image.src
  );

  return (
    <>
      <TabSection className="w-full flex flex-col gap-2">
        {/* Images */}
        <div className="w-full h-full flex flex-col gap-4">
          {/* Big image */}
          <div className="w-full xs:w-[inherit] xs:max-w-[700px] overflow-hidden rounded-lg">
            <Image
              width={700}
              height={700}
              src={selected_image}
              alt={project?.title || ""}
              className="w-[700px] object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex w-full flex-wrap gap-2">
            {project?.images?.map((image) => (
              <>
                {/* Thumbnail */}
                <div className="w-[70px] h-[50px] sm:w-[100px] sm:h-[70px] rounded overflow-hidden">
                  <Image
                    width={100}
                    height={70}
                    src={image as string}
                    alt={project?.title || ""}
                    className="w-[70px] h-[50px] sm:w-[100px] sm:h-[70px] object-cover cursor-pointer"
                    onClick={() => setSelectedImage(image as string)}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
        {/* Title + View button */}
        <div className="w-full flex gap-4 justify-between items-center">
          <span className="text-white text-xl">{project.title}</span>
          <Button
            variant="outlined"
            className="h-[30px]"
            outlined
            onClick={() => setShowSidedrawer(true)}
          >
            <span className="!text-2xs">View Project</span>
          </Button>
        </div>
        {/* Description */}
        <div
          className="list"
          dangerouslySetInnerHTML={{ __html: project.description }}
        ></div>
        {/* Funding Progress */}
        <FundingProgress
          project={project}
          full_width
          title_className=" !text-white"
        />
      </TabSection>
      <>
        <Drawer
          anchor="right"
          open={show_sidedrawer}
          onClose={() => setShowSidedrawer(false)}
        >
          <section className="p-2 bg-primary-dark max-w-[1000px] text-primary-grey">
            <ProjectDetail
              mode="public"
              project={project}
              onClose={() => setShowSidedrawer(false)}
            />
          </section>
        </Drawer>
      </>
    </>
  );
};

export default Project;
