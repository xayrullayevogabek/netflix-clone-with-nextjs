"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context";
import { toast } from "react-toastify";
import { getFavouritesMovie } from "@/lib/api";
import { FavouriteProps } from "@/types";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";

const Page = () => {
  const [data, setData] = useState<FavouriteProps[]>([]);
  const { data: session }: any = useSession();
  const { account, pageLoader, setPageLoader } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getFavouritesMovie(session?.user?.uid, account?._id);
        setData(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setPageLoader(false);
      }
    };
    if (session && account) {
      getData();
    }
  }, [account, session]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <div></div>;
};

export default Page;
