import React, { useState } from "react";
import Image from "next/image";
import { menuItems } from "@/constants";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "@/context";
import { signOut } from "next-auth/react";
import SearchBar from "./search-bar";

const Navbar = () => {
  const { account, setAccount } = useGlobalContext();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const logOut = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };

  return (
    <div className="relative">
      <header className="header hover:bg-black transition-all duration-150 h-[10vh]">
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

        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <SearchBar setShowSearchBar={setShowSearchBar}/>
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar((prev) => !prev)}
              className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
            />
          )}

          <Popover>
            <PopoverTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <img
                  src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"
                  className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                  alt="Current Profile"
                />
                <p>{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="rounded border border-gray-500">
              <button
                onClick={logOut}
                className="w-full bg-red-700 py-2 rounded hover:bg-red-900"
              >
                Log Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
