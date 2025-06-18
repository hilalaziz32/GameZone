"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Logout from "./Logout";

// Helper to get avatar initials
function getInitials(username: string) {
  if (!username) return "??";
  // Remove spaces and take the first two characters, lowercase
  return username.replace(/\s+/g, '').slice(0, 2).toLowerCase();
}

// Props typing
type AvatarDropdownProps = {
  username: string;
};

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ username }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // TypeScript: EventTarget may not be a Node, so cast
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = getInitials(username);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group relative focus:outline-none transition-all duration-200 hover:scale-105"
      >
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
        
        {/* Avatar circle */}
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-200">
          {/* Inner glow */}
          <div className="absolute inset-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
          
          {/* Initials */}
          <span className="relative text-white font-bold text-sm uppercase select-none tracking-wide">
            {initials}
          </span>
          
          {/* Subtle highlight */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
        </div>

        {/* Active indicator */}
        <div className={`absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-blue-500 rounded-full transition-all duration-200 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <>
          {/* Backdrop blur overlay */}
          <div className="fixed inset-0 bg-black/5 backdrop-blur-sm z-10"></div>
          
          <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl shadow-gray-900/10 py-2 z-30 animate-in slide-in-from-top-2 duration-200">
            {/* Arrow indicator */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200/50"></div>
            
            {/* User info section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs uppercase">
                    {initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {username}
                  </p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                href="/profile"
                className="group flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-150"
                onClick={() => setOpen(false)}
              >
                <div className="w-4 h-4 mr-3 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors duration-150"></div>
                <span className="font-medium">Profile</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                </div>
              </Link>
              
              {/* Elegant divider */}
              <div className="my-1 mx-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
              
              {/* Logout section with enhanced styling */}
              <div className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-150">
                <Logout />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;
