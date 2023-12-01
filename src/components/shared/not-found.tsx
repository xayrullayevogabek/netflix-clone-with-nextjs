import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";

interface Props {
  title?: string;
  desc?: string;
}

const NotFound = ({
  title = "Looks like you don't have any favourites yet!",
  desc = "Sorry about that! Please visit our hompage to get where you need to go.",
}: Props) => {
  const router = useRouter();
  const { setPageLoader } = useGlobalContext();
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="">
            <h1 className="my-2 text-gray-100 font-bold text-2xl">{title}</h1>
            <p className="my-2 text-gray-300">{desc}</p>
            <button
              className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
              onClick={() => {
                setPageLoader(true);
                router.push("/");
              }}
            >
              Back to Home!
            </button>
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default NotFound;
