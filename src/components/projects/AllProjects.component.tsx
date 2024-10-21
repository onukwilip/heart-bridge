"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.component";
import { useUserContext } from "@/contexts/User.context";
import { APPWRITE_DATABASE, TProject } from "@/utils/types";
import database from "@/utils/appwrite/appwrite_database.utils";
import { Query } from "appwrite";
import useFetch from "@/hooks/useFetch.hook";
import { Skeleton } from "@mui/material";
import Error404 from "../atoms/Error404.component";
import { useModalContext } from "@/contexts/Modal.context";

const AllProjects = () => {
  const { user, fetch_user_state } = useUserContext();
  const { modal } = useModalContext();
  const [projects, setProjects] = useState<TProject[]>([]);
  const fetch_projects_state = useFetch({ loading: true });

  /**
   * * Function responsible for retrieving orphanage projects
   */
  const get_projects = async () => {
    try {
      // * Display loading indicator
      fetch_projects_state.display_loading();

      // * Retrieve projects created by this user
      const projects = await database.listDocuments(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id || "")]
      );

      // * Add the results to the project list
      setProjects(
        projects.documents.map((project) => ({
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
        }))
      );
      // * Display success message
      fetch_projects_state.display_success("Projects retrieved successfully");
    } catch (error) {
      console.error(error);
      // * Display error message
      fetch_projects_state.display_error((error as any).message || error);
    }
  };

  useEffect(() => {
    // * If the user object hasn't been populated, return
    if (!user) return;

    if (!modal.open) get_projects();
  }, [modal.open, user]);

  return (
    <>
      {fetch_projects_state.loading || fetch_user_state.loading ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
          {Array.from(
            [1, 2, 3, 4, 5, 6, 7, 8].map(() => (
              <div className="w-full flex flex-col gap-2 max-w-[350px]">
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-md !bg-primary-grey"
                  height={150}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-sm !bg-primary-grey w-1/3"
                  height={15}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-sm !bg-primary-grey w-2/3"
                  height={15}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-sm !bg-primary-grey w-3/5"
                  height={15}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          {projects?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-10 place-items-center">
              {projects?.map((project) => (
                <ProjectCard project={project} key={project.$id} />
              ))}
            </div>
          ) : (
            <div>
              <Error404 msg="No projects found..." />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllProjects;
