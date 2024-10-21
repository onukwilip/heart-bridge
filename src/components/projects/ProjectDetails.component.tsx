"use client";

import Error404 from "@/components/atoms/Error404.component";
import useFetch from "@/hooks/useFetch.hook";
import database from "@/utils/appwrite/appwrite_database.utils";
import { APPWRITE_DATABASE, TProject } from "@/utils/types";
import { format_currency } from "@/utils/utils";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dummy_image from "@/images/dummy-image.jpg";
import Button from "@/components/atoms/Button.component";
import { useModalContext } from "@/contexts/Modal.context";
import CreateOrEditProject from "@/components/projects/CreateOrEditProject.component";
import { useUserContext } from "@/contexts/User.context";

const ProjectDetail = () => {
  const { project_id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<TProject>();
  const { open_modal, modal } = useModalContext();
  const { user } = useUserContext();
  const [selected_image, setSelectedImage] = useState(
    (project?.images?.[0] as string) || dummy_image.src
  );
  const fetch_project_state = useFetch({ loading: true });
  const progress_percentage =
    ((Number(project?.current_amount) || 0) / (Number(project?.goal) || 0)) *
    100;

  /**
   * * Function responsible for retrieving project details
   */
  const get_project_details = async () => {
    try {
      // * Display loading indicator
      fetch_project_state.display_loading();

      // * Retrieve the project details
      const project = await database.getDocument(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
        project_id as string
      );

      // * Add the result to the project details state
      setProject({
        $id: project.$id,
        title: project.title,
        description: project.description,
        images: project.images,
        user_id: project.user_id,
        current_amount: project.current_amount,
        $createdAt: project.$createdAt,
        donations: project.donations,
        goal: project.goal,
        status: project.status,
      });
      setSelectedImage(project?.images?.[0] || dummy_image.src);
      // * Display success message
      fetch_project_state.display_success("Project retrieved successfully");
    } catch (error) {
      console.error(error);
      // * Display error message
      fetch_project_state.display_error((error as any).message || error);
    }
  };

  /**
   * * Function responsible for displaying the modal to edit project details
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <CreateOrEditProject
          user_id={user?.$id || ""}
          existing_details={project}
        />
      ),
    });
  };

  useEffect(() => {
    if (!modal.open) get_project_details();
  }, [modal.open]);

  if (!fetch_project_state.loading && !project)
    return (
      <>
        <Error404 msg="Project doesn't exist" />
      </>
    );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Breadcrumb  + Edit button */}
      <div className="flex gap-4 mb-4 justify-between flex-wrap items-center">
        {/* Breadcrumb */}
        <div className="flex gap-2 !text-primary-grey capitalize">
          {/* Previous */}
          <span onClick={() => router.back()} className="cursor-pointer">
            <i className="fa-solid fa-arrow-left-long transition hover:!text-white"></i>
          </span>{" "}
          {/* Projects */}
          <span>Projects</span> &gt;
          {/* Current project */}
          <span>
            {fetch_project_state.loading ? (
              <Skeleton
                variant="text"
                animation="pulse"
                className="!bg-primary-grey w-[200px]"
              />
            ) : (
              project?.title
            )}
          </span>
        </div>
        {/* Edit button */}
        <Button className="!text-white flex gap-2" onClick={handle_edit_click}>
          <i className="fa-regular fa-pen-to-square"></i>
          <span>Edit project</span>
        </Button>
      </div>
      {/* Title + funding */}
      <div className="flex justify-between gap-4 w-full flex-wrap text-white items-center">
        {/* Title */}
        <span className="text-2xl">
          {fetch_project_state.loading ? (
            <Skeleton
              variant="text"
              animation="pulse"
              className="!bg-primary-grey w-[250px] rounded"
            />
          ) : (
            project?.title
          )}
        </span>
        {/* Fnding progress */}
        {fetch_project_state.loading ? (
          <Skeleton
            variant="text"
            animation="pulse"
            className="!bg-primary-grey w-[300px]"
          />
        ) : (
          <div className="flex gap-4 items-center text-sm">
            <span>Funding progress:</span>
            {/* Progress bar container */}
            <div
              className={`w-[200px] h-[30px] bg-weak-grey rounded-md overflow-hidden flex justify-center items-center relative pointer-events-none`}
            >
              {/* Progress bar */}
              <div
                style={{ width: `${progress_percentage}%` }}
                className={`h-full absolute top-0 left-0 z-10 ${
                  progress_percentage <= 50
                    ? "!bg-primary-grey"
                    : progress_percentage <= 75
                    ? "!bg-yellow-300/30"
                    : progress_percentage <= 100
                    ? "!bg-green-400/30"
                    : "!bg-primary-grey"
                }`}
              ></div>
              {/* Fraction */}
              <div className="">
                {format_currency(project?.current_amount || 0)}{" "}
                <span className="text-lg">/</span>
                {format_currency(project?.goal || 0)}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Date created */}
      <div className="flex">
        {fetch_project_state.loading ? (
          <Skeleton
            variant="text"
            animation="pulse"
            className="!bg-primary-grey w-[150px] rounded"
          />
        ) : (
          new Date(project?.$createdAt || "").toLocaleString()
        )}
      </div>
      {/* Images */}
      <div className="w-full h-full flex flex-col gap-4">
        {fetch_project_state.loading ? (
          <Skeleton
            variant="rectangular"
            animation="pulse"
            className="!bg-primary-grey rounded-lg w-full h-[200px] sm:[600px] md:w-[700px] lg:w-[1000px] md:h-[400px]"
          />
        ) : (
          <>
            {/* Big image */}
            <div className="w-full xs:w-[inherit] xs:max-w-[1000px] overflow-hidden rounded-lg">
              <Image
                width={1000}
                height={700}
                src={selected_image}
                alt={project?.title || ""}
                className="w-[1000px] object-cover"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex w-full flex-wrap gap-2">
              {project?.images?.map((image) => (
                <>
                  {/* Thumbnail */}
                  <div className="w-[100px] h-[70px] rounded overflow-hidden">
                    <Image
                      width={100}
                      height={70}
                      src={image as string}
                      alt={project?.title || ""}
                      className="w-[100px] h-[70px] object-cover cursor-pointer"
                      onClick={() => setSelectedImage(image as string)}
                    />
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Description */}
      {fetch_project_state.loading ? (
        <>
          <Skeleton
            variant="text"
            animation="pulse"
            className="!bg-primary-grey w-[230px] sm:w-[550px] rounded-sm"
          />
          <Skeleton
            variant="text"
            animation="pulse"
            className="!bg-primary-grey w-[280px] sm:w-[650px] rounded-sm"
          />
          <Skeleton
            variant="text"
            animation="pulse"
            className="!bg-primary-grey w-[180px] sm:w-[500px] rounded-sm"
          />
        </>
      ) : (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: project?.description || "" }}
        ></div>
      )}
    </div>
  );
};

export default ProjectDetail;
