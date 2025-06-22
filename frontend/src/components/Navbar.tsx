import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import AvatarDropdown from "./AvatarDropdown";
import { Swords } from "lucide-react";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-100 border-b border-gray-200/50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-2 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link 
            className="group flex items-center transition-all duration-200 hover:scale-105" 
            href="/"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Swords className="text-2xl text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-200">
                ClashForge
              </span>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/signin">
                  <button className="relative overflow-hidden px-5 py-2.5 sm:text-sm text-[10px] font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <span className="relative z-10">Login</span>
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="relative overflow-hidden px-5 py-2.5 sm:text-sm text-[10px] font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/registered-zone">
                  <button className="relative group px-5 py-2.5 sm:text-sm text-[10px] font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Register Zone</span>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </span>
                    <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </button>
                </Link>
                
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25"></div>
                  <div className="relative">
                    <AvatarDropdown username={user?.user_metadata?.username || "User"} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Animated border bottom */}
      {/* <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div> */}
    </nav>
  );
};

export default Navbar;
