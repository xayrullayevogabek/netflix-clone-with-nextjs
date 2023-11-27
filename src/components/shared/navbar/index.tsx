import React, { useEffect, useState } from "react";
import Image from "next/image";
import { menuItems } from "@/constants";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "./search-bar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MoviePoppup from "../movie/movie-poppup";
import { AccountProps, AccountResponse } from "@/types";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  const { account, setAccount, setPageLoader } = useGlobalContext();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session }: any = useSession();

  const logOut = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };

  useEffect(() => {
    const getAllAccouts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session.user.uid}`
        );
        data.success && setAccounts(data.accounts as AccountProps[]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    getAllAccouts();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <header
        className={cn(
          "header hover:bg-black transition-all duration-150 h-[10vh]",
          isScrolled && "bg-black"
        )}
      >
        <div className="flex items-center h-full space-x-2 md:space-x-10">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
          />

          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  router.push(item.path);
                  setPageLoader(true);
                }}
                key={item.path}
                className={
                  "cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
                }
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <MoviePoppup />

        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <SearchBar setShowSearchBar={setShowSearchBar} />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar((prev) => !prev)}
              className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
            />
          )}

          <Popover >
            <PopoverTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <img
                  src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"
                  alt="Current Profile"
                  className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                />
                <p>{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {isLoading ? (
                <div className={"flex flex-col space-y-4"}>
                  {[1, 2].map((_, i) => (
                    <Skeleton className={"w-full h-14"} />
                  ))}
                </div>
              ) : (
                accounts &&
                accounts.map((account) => (
                  <div
                    className={
                      "cursor-pointer flex gap-3 h-14 hover:bg-slate-800 rounded-md items-center px-4 py-2"
                    }
                    key={account._id}
                    onClick={() => {
                      setAccount(null);
                      sessionStorage.removeItem("account");
                    }}
                  >
                    <img
                      src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"
                      alt="Current Profile"
                      className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                    />
                    <p>{account.name}</p>
                  </div>
                ))
              )}

              <button
                onClick={logOut}
                className={
                  "mt-4 text-center bg-red-700 w-full text-sm font-medium hover:bg-red-800 rounded-md py-2 border  h-[56px]"
                }
              >
                Sign out of Netflix
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
