import { TUser } from "@/utils/types";
import { Models } from "appwrite";
import Image from "next/image";
import React, { FC } from "react";
import dummy_image from "@/images/dummy-profile-pic.png";
import Link from "next/link";

const ProfileCard: FC<{ user: TUser }> = ({ user }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Image container */}
      <Link
        href={"/dashboard"}
        className="rounded-full block overflow-x-hidden overflow-y-hidden w-[40px] h-[40px] md:w-[60px]"
      >
        <Image
          width={40}
          height={40}
          src={user?.image || dummy_image.src}
          alt={user?.firstname || ""}
          className=" object-cover max-w-[60px] w-full h-full"
        />
      </Link>
      <div className="hidden md:flex flex-col capitalize text-sm w-full">
        <span className="font-bold text-white w-full">
          {user?.account_type === "donor"
            ? user?.firstname
            : user?.orphanage_name}
        </span>
        <span>{user?.account_type}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
