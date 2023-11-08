import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";


const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className=" absolute inset-0 opacity-70">
        <Image
          src={
            "https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/ac9ee15a-8de0-479e-9ed7-368feafeada7/UZ-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          }
          alt="bg-image"
          fill
        />
      </div>
      <div className="relative rounded-md z-10 w-[500px] bg-black/70 h-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4">
        <div className="flex w-full h-full items-center flex-col justify-center">
          <Button
            onClick={() => signIn("github")}
            className="mt-4 flex items-center bg-red-800 hover:bg-red-900 rounded w-full h-[56px] text-white gap-2"
          >
            <AiFillGithub className="w-7 h-7" />
            Sign in with Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
