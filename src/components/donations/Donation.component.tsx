import { TDonation, TProject, TUser, TUserRoles } from "@/utils/types";
import Image from "next/image";
import React, { FC } from "react";
import { format_currency } from "@/utils/utils";
import dummy_profile from "@/images/dummy-profile-pic.png";
import Link from "next/link";

const Donation: FC<{
  donation: TDonation;
  account_type: TUserRoles;
  className?: string;
}> = ({ donation, account_type, className }) => {
  return (
    <div
      className={`w-full flex flex-col xs:flex-row xs:items-center gap-x-3 gap-y-3 p-3 rounded-md border border-weak-grey ${
        className || ""
      }`}
    >
      {/* Image */}
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
        <Image
          className="w-[70px] h-[70px] object-cover"
          width={70}
          height={70}
          src={(donation.donor as TUser)?.image || dummy_profile.src}
          alt={(donation.donor as TUser)?.firstname || "anonymous"}
        />
      </div>
      {/* Content */}
      <div className="flex flex-col gap-3 gap-y-1">
        {/* Name */}
        <div>
          {donation.donor
            ? `${(donation.donor as TUser).firstname} ${
                (donation.donor as TUser).lastname
              }`
            : `An anonymous donor`}
        </div>
        {/* Amount + date */}
        <div className="flex gap-x-3 gap-y-1 flex-wrap">
          {/* Project */}
          <Link
            className="!text-primary"
            href={
              account_type === "donor"
                ? `/orphanages/${donation.orphanage_id}?project=${
                    (donation.project as TProject)?.$id
                  }`
                : `/dashboard/projects/${(donation.project as TProject)?.$id}`
            }
          >
            {(donation.project as TProject)?.title}
          </Link>
          {/* Amount */}
          <span>{format_currency(Number(donation.amount))}</span>
          {/* Date */}
          <span>{new Date(donation.$createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Donation;
