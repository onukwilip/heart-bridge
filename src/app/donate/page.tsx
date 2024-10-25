import Error404 from "@/components/atoms/Error404.component";
import Donate from "@/components/donate/Donate.component";
import Header from "@/components/profile/Header.component";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import users from "@/utils/appwrite/node_appwrite_users.utils";
import { APPWRITE_DATABASE, TProject, TUser } from "@/utils/types";
import { Metadata } from "next";
import { Models } from "node-appwrite";
import React, { FC } from "react";

type Props = {
  searchParams: Record<string, string>;
};

/**
 * * Function responsible for dynamically rendering the page's metadata object
 * @param param0 The next JS property
 * @returns The page metadata object
 */
export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  try {
    const orphanage_id = searchParams["orphanage"];
    const project_id = searchParams["project"];

    const user = await users.get<TUser>(orphanage_id || "");
    const project = await database.getDocument<Models.Document & TProject>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
      project_id || ""
    );

    return {
      title: `Donate to ${
        user.prefs.orphanage_name ||
        `${user.prefs.firstname} ${user.prefs.lastname}`
      }'s ${project.title} project`,
      description:
        `${project.description?.slice(0, 200)}...` || "Donate to project",
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Project not found",
    };
  }
};

const DonatePage: FC<Props> = async ({ searchParams }) => {
  try {
    const orphanage_id = searchParams["orphanage"];
    const project_id = searchParams["project"];

    const user = await users.get<TUser>(orphanage_id || "");
    const project = await database.getDocument<Models.Document & TProject>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
      project_id || ""
    );

    return (
      <section className="relative w-full">
        <Header />
        <br />
        <Donate user={user} project={project} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="h-screen flex items-center justify-center">
        <Error404 msg="The Project you intend to donate to was not found" />
      </section>
    );
  }
};

export default DonatePage;
