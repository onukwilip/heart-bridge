import LogoText from "@/components/Logo.component";
import React from "react";
import bg_img from "@/images/pawan-sharma-lBQuPKiX2e0-unsplash.jpg";
import SignUpForm from "@/components/signup/Form.component";

const SignUp = () => {
  return (
    <div className="flex items-stretch h-full relative">
      {/* Form container */}
      <div className="flex-1 flex items-center justify-center flex-col gap-3 h-full p-4">
        <LogoText />
        <div className="text-3xl font-bold text-white capitalize">
          Join our community
        </div>
        <span className="text-weak-white max-w-[500px] text-center">
          Create your account to support orphanages, manage projects, and make a
          difference.
        </span>
        <SignUpForm className="!max-w-[500px]" />
      </div>
      {/* Image background container */}
      <div className="flex-1 absolute top-0 left-0 -z-[1] sm:static">
        <img
          width={100}
          height={100}
          className="w-screen opacity-15 sm:opacity-100 sm:w-full h-screen max-h-screen object-cover"
          src={bg_img.src}
          alt="Background image"
        />
      </div>
    </div>
  );
};

export default SignUp;
