import React from "react";
import OutlinedButton from "./OutlinedButton.component";
import welcomImg from "@/images/dashboard_welcom.png";
import Image from "next/image";

const WelcomeCard = () => {
  return (
    <div className="bg-primary relative p-10 rounded-2xl items-center flex justify-between">
      {/* Welcome Text */}
      <div className=" text-white  flex flex-col gap-y-2">
        <h2 className="text-3xl font-bold">Welcome back</h2>
        <p>
          You have new donations and scheduled visitations. <br />
          Check them out!
        </p>
        <div className="flex gap-x-4">
          <OutlinedButton text="Donations" />
          <OutlinedButton text="Visitations" />
        </div>
      </div>

      {/* Image */}
      <div className="absolute bottom-0 right-10">
        <Image src={welcomImg} alt="Welcome" height={200} />
      </div>
    </div>
  );
};

export default WelcomeCard;
