import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";
import { IoGameController } from "react-icons/io5";

const Navbar = async () => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="border-b bg-white w-full flex items-center sm:px-10 px-2">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
         <div className="flex items-center gap-2 text-black">
          <IoGameController/> <span>Esport</span>
         </div>
        </Link>
        <div className="flex items-center sm:gap-x-5 gap-x-2">
          {!user ? (
            <Link href="/login">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 sm:text-sm text-[10px] text-gray-700">
                {user?.email}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
