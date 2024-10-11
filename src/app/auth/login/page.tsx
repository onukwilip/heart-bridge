import React from "react";
import bg_img from "@/images/annie-spratt-QdK6aujOLYs-unsplash.jpg";
import LogoText from "@/components/logo.component";
import LoginForm from "@/components/login/form.component";

const Login = () => {
  return (
    <div className="flex items-stretch h-full relative">
      {/* Image background container */}
      <div className="flex-1 absolute top-0 left-0 -z-[1] sm:static">
        <img
          width={100}
          height={100}
          className="w-screen opacity-25 sm:opacity-100 sm:w-full h-screen max-h-screen object-cover"
          src={bg_img.src}
          alt="Background image"
        />
      </div>
      {/* Form container */}
      <div className="flex-1 flex items-center justify-center flex-col gap-3 h-full p-4">
        <LogoText />
        <div className="text-3xl font-bold text-white">Welcome Back</div>
        <span className="text-weak-white max-w-[500px] text-center">
          Log in to manage your projects or donations and stay connected.
        </span>
        <LoginForm className="!max-w-[500px]" />
      </div>
    </div>
  );
};

export default Login;
