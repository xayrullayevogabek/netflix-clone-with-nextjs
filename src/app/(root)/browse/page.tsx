"use client";
import React from "react";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react"; 
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
const Page = () => {
  const { account } = useGlobalContext();
  const { data: session } = useSession();

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;

  console.log(session)

  return <div>Browse Page</div>;
};

export default Page;
