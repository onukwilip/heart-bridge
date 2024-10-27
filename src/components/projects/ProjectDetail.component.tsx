"use client";
import Error404 from "@/components/atoms/Error404.component";
import useFetch from "@/hooks/useFetch.hook";
import database from "@/utils/appwrite/appwrite_database.utils";
import { APPWRITE_DATABASE, TDonation, TProject, TUser } from "@/utils/types";
import { format_currency } from "@/utils/utils";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import dummy_image from "@/images/dummy-image.jpg";
import dummy_profile from "@/images/dummy-profile-pic.png";
import Button from "@/components/atoms/Button.component";
import { useModalContext } from "@/contexts/Modal.context";
import CreateOrEditProject from "@/components/projects/CreateOrEditProject.component";
import { useUserContext } from "@/contexts/User.context";
import FundingProgress from "./FundingProgress.component";
import { get_donations } from "@/actions/donation.action";
import TabSection from "../molecules/TabSection.component";

const ProjectDetail: FC<{
  mode: "public" | "private";
  project?: TProject;
  onClose?: Function;
}> = ({ mode, project: project_from_parent, onClose }) => {
  const { projectID: project_id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<TProject | undefined>(
    project_from_parent
  );
  const [donations, setDonations] = useState<TDonation[]>([]);
  const { open_modal, modal } = useModalContext();
  const { user } = useUserContext();
  const [selected_image, setSelectedImage] = useState(
    (project?.images?.[0] as string) || dummy_image.src
  );
  const fetch_project_state = useFetch({
    loading: project_from_parent ? false : true,
  });
  const fetch_donations_state = useFetch({
    loading: true,
  });

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
   * * Function responsible for retrieving donations made to project
   */
  const get_project_donations = async () => {
    try {
      // * Display loading indicator
      fetch_donations_state.display_loading();

      // * Retrieve the project donations
      const donations = await get_donations(
        "orphanage",
        user?.$id || "",
        project?.$id
      );

      // * Add the result to the list of donations
      setDonations(donations);
      // * Display success message
      fetch_donations_state.display_success("Donations retrieved successfully");
    } catch (error) {
      console.error(error);
      // * Display error message
      fetch_donations_state.display_error((error as any).message || error);
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

  /**
   * * Function responsible for displaying the modal to donate to project
   */
  const handle_donate_click = () => {
    router.push(
      `/donate?orphanage=${project?.user_id}&project=${project?.$id}`
    );
  };

  useEffect(() => {
    console.log("HERE");
    if (
      mode === "private" &&
      project &&
      user &&
      donations.length < 1 &&
      fetch_donations_state.loading
    ) {
      get_project_donations();
    } else if (mode === "public" && project) {
      get_project_donations();
    }
  }, [fetch_project_state.loading, user]);

  useEffect(() => {
    if (!modal.open && !project_from_parent) get_project_details();
  }, [modal.open]);

  if (!fetch_project_state.loading && !project)
    return (
      <>
        <Error404 msg="Project doesn't exist" />
      </>
    );

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {/* Breadcrumb  + Edit button */}
      <div className="w-full flex gap-4 mb-4 justify-between flex-wrap items-center max-w-[1200px]">
        {/* Breadcrumb */}
        <div className="flex gap-2 !text-primary-grey capitalize">
          {/* Previous */}
          <span
            onClick={() =>
              mode === "public" && onClose ? onClose() : router.back()
            }
            className="cursor-pointer"
          >
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
        {mode === "private" ? (
          <Button
            className="!text-white flex gap-2"
            onClick={handle_edit_click}
          >
            <i className="fa-regular fa-pen-to-square"></i>
            <span>Edit project</span>
          </Button>
        ) : (
          <Button
            outlined
            className="flex gap-2 w-[150px] !h-[40px] text-xs"
            onClick={handle_donate_click}
          >
            <i className="fas fa-dollar-sign"></i>
            <span>Donate</span>
          </Button>
        )}
      </div>
      {/* Title + funding */}
      <div className="w-full flex justify-between gap-4 flex-wrap text-white items-center max-w-[1200px]">
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
        {/* Funding progress */}
        {fetch_project_state.loading ? (
          <Skeleton
            variant="text"
            animation="pulse"
            className="!bg-primary-grey w-[300px]"
          />
        ) : (
          <FundingProgress project={project as TProject} />
        )}
      </div>
      {/* Date created */}
      <div className="w-full flex max-w-[1200px]">
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
      {/* Images + description + donations */}
      <div
        className={`w-full flex flex-col gap-6 items-start max-w-[1200px] ${
          mode === "private" ? "lg:flex-row" : ""
        }`}
      >
        {/* Images + description */}
        <div
          className={`w-full flex flex-grow gap-8 flex-col ${
            mode === "private" ? "lg:w-[60%]" : ""
          }`}
        >
          {/* Images */}
          <div className="w-full flex flex-col gap-4">
            {fetch_project_state.loading ? (
              <Skeleton
                variant="rectangular"
                animation="pulse"
                className="!bg-primary-grey rounded-lg w-full !h-[200px] md:!h-[400px]"
                height={200}
              />
            ) : (
              <>
                {/* Big image */}
                <div className="w-full overflow-hidden rounded-lg">
                  <Image
                    width={1000}
                    height={700}
                    src={selected_image}
                    alt={project?.title || ""}
                    className="w-full object-cover"
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
              className="w-full list"
              dangerouslySetInnerHTML={{ __html: project?.description || "" }}
            ></div>
          )}
        </div>
        {/* Donation list */}
        <TabSection
          className={`w-full flex flex-shrink gap-4 flex-col sticky top-0 right-0 ${
            mode === "private"
              ? "max-w-[500px] lg:max-w-fit lg:w-[40%]"
              : "max-w-[500px] w-full"
          }`}
        >
          <div className="text-xl !text-white">Donations</div>
          {fetch_donations_state.loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((_) => (
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 p-3 rounded-md border border-weak-grey">
                  <Skeleton
                    variant="circular"
                    className="w-[70px] h-[40px] !bg-primary-grey"
                    width={70}
                    height={70}
                    animation="pulse"
                  />
                  <Skeleton
                    variant="text"
                    className="w-[80%] xs:w-[70px] !bg-primary-grey"
                    // width={70}
                    animation="pulse"
                  />
                  <Skeleton
                    variant="text"
                    className="w-[80%] xs:w-[70px] !bg-primary-grey"
                    // width={70}
                    animation="pulse"
                  />
                  <Skeleton
                    variant="text"
                    className="w-[80%] xs:w-[70px] !bg-primary-grey"
                    // width={70}
                    animation="pulse"
                  />
                  <Skeleton
                    variant="text"
                    className="w-[80%] xs:w-[70px] !bg-primary-grey"
                    // width={70}
                    animation="pulse"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3">
              {donations.length > 0 ? (
                <>
                  {donations.map((donation) => (
                    <div
                      className="w-full max-w-[600px] flex flex-col xs:flex-row xs:items-center xs:max-w-full gap-x-3 gap-y-3 p-3 rounded-md border border-weak-grey"
                      key={donation.$id}
                    >
                      {/* Image */}
                      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                        <Image
                          className="w-[70px] h-[70px] object-cover"
                          width={70}
                          height={70}
                          src={
                            (donation.donor as TUser).image || dummy_profile.src
                          }
                          alt={(donation.donor as TUser).firstname}
                        />
                      </div>
                      {/* Content */}
                      <div className="flex flex-col gap-3 gap-y-1">
                        {/* Name */}
                        <div>{`${(donation.donor as TUser).firstname} ${
                          (donation.donor as TUser).lastname
                        }`}</div>
                        {/* Amount + date */}
                        <div className="flex gap-x-3 gap-y-1 flex-wrap">
                          {/* Amount */}
                          <span>
                            {format_currency(Number(donation.amount))}
                          </span>
                          {/* Date */}
                          <span>
                            {new Date(donation.$createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div
                  className={`w-full flex text-nowrap ${
                    mode === "private" ? "w-full xs:w-[450px]" : "w-full"
                  }`}
                >
                  No donations found
                </div>
              )}
            </div>
          )}
        </TabSection>
      </div>
    </div>
  );
};

export default ProjectDetail;
