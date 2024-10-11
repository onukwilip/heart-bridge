import Image from "next/image";
import React from "react";
import bg_img from "@/images/annie-spratt-QdK6aujOLYs-unsplash.jpg";
import LogoText from "@/components/logo.component";

const Login = () => {
  return (
    <div className="flex items-stretch">
      {/* Image background container */}
      <div className="flex-1">
        <img
          width={100}
          height={100}
          className="w-full h-screen max-h-screen object-cover"
          src={bg_img.src}
          alt="Background image"
        />
      </div>
      {/* Form container */}
      <div className="flex-1 flex items-center justify-center flex-col gap-1">
        <LogoText />
        <div className="text-3xl font-bold">Welcome Back</div>
        <span className="text-weak-white">
          Log in to manage your projects or donations and stay connected.
        </span>
      </div>
    </div>
  );
};

export default Login;
