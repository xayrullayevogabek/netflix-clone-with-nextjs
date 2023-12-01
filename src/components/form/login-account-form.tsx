"use client";
import { AccountProps, AccountResponse } from "@/types";
import axios from "axios";
import React, { useState } from "react";
import PinInput from "react-pin-input";
import { useGlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  currentAccount: AccountProps | null;
}

const LoginAccountForm = ({ currentAccount }: Props) => {
  const [error, setError] = useState(false);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAccount } = useGlobalContext();
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = async (value: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post<AccountResponse>(`/api/account/login`, {
        uid: currentAccount?.uid,
        accountId: currentAccount?._id,
        pin: value,
      });

      if (data.success) {
        setAccount(data.accounts as AccountProps);
        router.push(pathname);
        sessionStorage.setItem("account", JSON.stringify(data.accounts));
        toast.success("Account successfully unlocked !");
      } else {
        setError(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-gray-400 font-bold text-[16px] mb-4">
        Profile Lock is currently ON
      </h1>
      {error ? (
        <h2 className="text-red-500 text-center font-bold text-20px">
          Whoops, wrong PIN. Please try again
        </h2>
      ) : (
        <h2 className="text-white text-center font-bold text-[20px]">
          Enter your PIN to access this profile
        </h2>
      )}
      <div className="flex items-center justify-center">
        <PinInput
          length={4}
          initialValue={pin}
          onChange={(value) => setPin(value)}
          secret
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "10px",
          }}
          inputStyle={{
            borderColor: "RGBA(255,255,255, 0.16)",
            height: "56px",
            width: "100%",
            fontSize: "40px",
            borderRadius: "5px",
          }}
          disabled={isLoading}
          secretDelay={1000}
          type="numeric"
          inputMode="number"
          inputFocusStyle={{ borderColor: "RGBA(255,255,255, 0.80)" }}
          autoSelect={true}
          onComplete={(value) => onSubmit(value)}
        />
      </div>
    </>
  );
};

export default LoginAccountForm;
