import { TUser } from "@/utils/types";
import Image from "next/image";
import React, { FC } from "react";
import cover_image from "@/images/photo-1543689604-6fe8dbcd1f59 1.png";
import dummy_image from "@/images/dummy-profile-pic.png";
import Button from "../atoms/Button.component";
import { Skeleton } from "@mui/material";

const ProfileHeader: FC<{ user?: TUser; loading?: boolean }> = ({
  user,
  loading,
}) => {
  return (
    <div className="w-full h-[250px] relative flex items-end">
      {/* Cover image comtainer */}
      <div className="w-full h-[150px] xs:h-[200px] absolute top-0 left-0 overflow-hidden rounded">
        {loading ? (
          <>
            <Skeleton
              variant="rounded"
              animation="pulse"
              className="!bg-primary-grey"
              width={"100%"}
              height={"100%"}
            />
          </>
        ) : (
          <img
            src={cover_image.src}
            alt="cover image"
            className="w-[750px] h-[200px] object-cover"
          />
        )}
      </div>
      {/* Profile contents */}
      <div className="w-full flex flex-col xs:flex-row items-start xs:items-end justify-between gap-4 relative z-10 px-4">
        {/* Image + name */}
        <div className="flex gap-2 items-end">
          {/* Profile image */}
          <div
            className={`w-[105px] h-[105px] overflow-hidden rounded-full border-[2px] ${
              loading ? "border-page-dark" : "border-white"
            }`}
          >
            {loading ? (
              <>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  className="!bg-[#484848]"
                  width={"100%"}
                  height={"100%"}
                />
              </>
            ) : (
              <Image
                src={user?.image || dummy_image.src}
                alt="profile image"
                className="w-[105px] h-[105px] object-cover"
                width={300}
                height={300}
              />
            )}
          </div>
          {/* Orphanage name */}
          {loading ? (
            <>
              <Skeleton
                variant="text"
                animation="pulse"
                className="!bg-[#484848]"
                width={"200px"}
              />
            </>
          ) : (
            <div className="capitalize text-lg xs:text-xl text-white">
              {user?.orphanage_name}
            </div>
          )}
        </div>
        {/* Actions */}
        {!loading && (
          <div className="flex gap-2">
            <Button className="!h-[30px] w-[100px]">
              <span className="!text-2xs">Book a visit</span>{" "}
            </Button>
            <Button className="!h-[30px] w-fit" outlined size="small">
              <i className="fas fa-phone !text-xs"></i>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
