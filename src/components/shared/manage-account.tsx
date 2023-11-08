"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LockKeyhole, Trash2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginAccountForm from "@/components/form/login-account-form";
import CreateAccountForm from "@/components/form/create-account-form";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<"login" | "create">();

  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-5xl my-12">
          Who is watching ?
        </h1>
        <ul className="flex p-0 my-12">
          <li
            onClick={() => {
              setOpen(true);
              setState("login");
            }}
            className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
          >
            <div className="relative">
              <div className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative">
                <Image
                  src={
                    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"
                  }
                  className=" rounded-full"
                  alt={"account"}
                  fill
                />
                {isDelete ? (
                  <div
                    className={
                      "absolute transform bottom-0 right-0 z-10 cursor-pointer"
                    }
                  >
                    <Trash2 className={"w-8 h-8 text-red-600"} />
                  </div>
                ) : null}
              </div>
              <div className={"flex mt-2 items-center justify-center gap-1"}>
                <span className={"font-mono font-bold text-xl"}>Og'abek</span>
                <LockKeyhole />
              </div>
            </div>
          </li>
          <li
            className={
              "border bg-white font-bold text-black text-xl rounded-full max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
            }
            onClick={() => {
              setOpen(true);
              setState("create");
            }}
          >
            <Plus className=" w-10 h-10" />
          </li>
        </ul>
        <Button
          onClick={() => setIsDelete((prev) => !prev)}
          className={
            "bg-transparent rounded-none hover:bg-transparent !text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
          }
        >
          Manage Profiles
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black border-none rounded">
          {state === "login" && <LoginAccountForm/>}
          {state === "create" && <CreateAccountForm/>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;
