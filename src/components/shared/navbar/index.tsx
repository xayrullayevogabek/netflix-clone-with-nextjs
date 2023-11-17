import React from "react";
import Image from "next/image";
import { menuItems } from "@/constants";

const Navbar = () => {
  return (
    <div className="relative">
      <header className="header">
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
      </header>
    </div>
  );
};

export default Navbar;
