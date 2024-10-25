import { get_user } from "@/actions/user_profile.actions";
import Error403 from "@/components/atoms/Error403.component";
import Error404 from "@/components/atoms/Error404.component";
import Header from "@/components/profile/Header.component";
import OrphanageProfile from "@/components/profile/OrphanageProfile.component";
import { parse_json } from "@/utils/utils";
import { Metadata } from "next";
import React, { FC, Suspense } from "react";

type Props = {
  params: { orphanage_id: string };
};

/**
 * * Function responsible for dynamically rendering the page's metadata object
 * @param param0 The next JS property
 * @returns The page metadata object
 */
export const generateMetadata = async ({
  params: { orphanage_id },
}: Props): Promise<Metadata> => {
  try {
    const user = await get_user(orphanage_id);

    return {
      title: `${user.prefs.firstname} ${user.prefs.lastname} | Heart Bridge`,
      description: `${user.prefs.bio?.slice(0, 200)}...` || "Orphanage profile",
    };
  } catch (error) {
    const parsed_error_msg = parse_json<{ code: number }>(
      (error as any).message || error
    );
    if (typeof parsed_error_msg === "object" && parsed_error_msg.code === 403) {
      return {
        title: "You are not authorized",
        description: "You are not authorized to view this profile",
      };
    } else {
      return {
        title: "Profile",
      };
    }
  }
};

const OrphanageProfilePage: FC<Props> = async ({
  params: { orphanage_id },
}) => {
  try {
    const user = await get_user(orphanage_id);

    return (
      <div>
        <Header />
        <OrphanageProfile user={user} />
      </div>
    );
  } catch (error) {
    console.error("ERROR", error);

    const parsed_error_msg = parse_json<{ code: number }>(
      (error as any).message || error
    );
    if (typeof parsed_error_msg === "object" && parsed_error_msg.code === 403) {
      return <Error403 msg="You are not authorized to view this profile" />;
    }

    return <Error404 msg="User doesn't exist" />;
  }
};

export default OrphanageProfilePage;