"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import Common from "@/components/shared/common";
const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    setPageLoader(false);
  });

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common />;
};

export default Page;
