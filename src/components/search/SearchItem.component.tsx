import { TProject, TSearchType, TUser } from "@/utils/types";
import Image from "next/image";
import React, { FC } from "react";
import dummy_profile from "@/images/dummy-profile-pic.png";
import dummy_image from "@/images/dummy-image.jpg";
import Link from "next/link";
import { format_currency } from "@/utils/utils";

const SearchItem: FC<{
  type: TSearchType;
  orphanage?: TUser;
  project?: TProject;
}> = ({ project, type, orphanage }) => {
  return (
    <Link
      href={`/orphanages/${
        type === "orphanage" ? orphanage?.$id : project?.user_id
      }/${type === "project" ? `?project=${project?.$id}` : ""}`}
      className="w-full flex flex-col xs:flex-row xs:items-center gap-x-3 gap-y-3 p-3 rounded-md border border-weak-grey transition hover:bg-weak-grey/5"
    >
      {/* Image */}
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
        <Image
          className="w-[70px] h-[70px] object-cover"
          width={70}
          height={70}
          src={
            type === "orphanage"
              ? orphanage?.image || dummy_profile.src
              : (project?.images[0] as string) || dummy_image.src
          }
          alt={
            type === "orphanage"
              ? orphanage?.firstname || ""
              : project?.title || ""
          }
        />
      </div>
      {/* Content */}
      <div className="flex flex-col gap-3 gap-y-1">
        {/* Name */}
        <div className="text-lg !text-white">
          {type === "orphanage"
            ? orphanage?.orphanage_name ||
              `${orphanage?.firstname} ${orphanage?.lastname}`
            : project?.title}
        </div>
        {/* Location */}
        <div className="flex gap-x-3 gap-y-1 text-sm items-center">
          {type === "orphanage" ? (
            <i className="fas fa-map-pin"></i>
          ) : (
            <span>Funding: </span>
          )}{" "}
          <span>
            {type === "orphanage"
              ? orphanage?.location?.formatted_address
              : `${format_currency(
                  project?.current_amount || 0
                )}/${format_currency(project?.goal || 0)}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
