import { format_currency } from "@/utils/utils";
import React, { FC, useEffect, useState } from "react";
import Button from "../atoms/Button.component";
import { Models } from "appwrite";
import { TUser } from "@/utils/types";
import { get_current_user } from "@/utils/appwrite/auth.utils";
import useFetch from "@/hooks/useFetch.hook";
import Loader from "../atoms/Loader.component";
import Link from "next/link";
import { useModalContext } from "@/contexts/Modal.context";

const SuccessDonation: FC<{
  amount: string;
  project_title: string;
  user?: TUser;
  user_fetch_state: { loading: boolean };
}> = ({ project_title, amount, user, user_fetch_state }) => {
  const { close_modal } = useModalContext();

  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      {/* Checkmark image */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="50" fill="#007AFF" />
        <path
          d="M42.9997 59.73L34.903 51.6333C34.4667 51.1971 33.875 50.952 33.258 50.952C32.641 50.952 32.0493 51.1971 31.613 51.6333C31.1767 52.0696 30.9316 52.6613 30.9316 53.2783C30.9316 53.5838 30.9918 53.8864 31.1087 54.1686C31.2256 54.4508 31.397 54.7073 31.613 54.9233L41.3664 64.6767C42.2764 65.5867 43.7464 65.5867 44.6564 64.6767L69.343 39.99C69.7793 39.5537 70.0244 38.962 70.0244 38.345C70.0244 37.728 69.7793 37.1363 69.343 36.7C68.9067 36.2637 68.315 36.0186 67.698 36.0186C67.081 36.0186 66.4893 36.2637 66.053 36.7L42.9997 59.73Z"
          fill="white"
        />
      </svg>
      {/* Message */}
      <span className="text-2xl font-bold text-white">
        Donation Successful!
      </span>
      {/* Summarry */}
      <span className="max-w-[300px] text-center !text-white">
        You have successfully donated <b>{format_currency(Number(amount))}</b>{" "}
        to the <b>{project_title}</b> project{" "}
      </span>
      {/* Actions */}
      <div className="flex gap-3">
        <Button className="!h-[40px] text-xs">Book a visit</Button>
        <Button className="!h-[40px] text-xs" outlined>
          Schedule call
        </Button>
      </div>
      {/* Link */}
      {user_fetch_state.loading ? (
        <Loader type="button" />
      ) : user ? (
        <Link
          href={"/dashboard"}
          className="text-primary"
          onClick={close_modal}
        >
          Go to dashboard <i className="fas fa-long-arrow-right"></i>
        </Link>
      ) : (
        <Link
          href={"/auth/login"}
          className="text-primary"
          onClick={close_modal}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default SuccessDonation;
