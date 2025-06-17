import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import { IoGameController } from "react-icons/io5";
import AvatarDropdown from "./AvatarDropdown";

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
            <IoGameController /> <span>Esport</span>
          </div>
        </Link>
        <div className="flex items-center sm:gap-x-5 gap-x-2">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                  Login
                </div>
              </Link>
              <Link href="/signup">
                <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                  Signup
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={"/registered-zone"}>
                <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                  Register Zone
                </button>
              </Link>
              <AvatarDropdown username={user?.user_metadata?.username || "User"} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
