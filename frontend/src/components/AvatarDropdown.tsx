"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Logout from "./Logout";

function getInitials(username) {
  if (!username) return "??";
  // Remove spaces and take the first two characters, lowercase
  return username.replace(/\s+/g, '').slice(0, 2).toLowerCase();
}

const AvatarDropdown = ({ username }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = getInitials(username);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border text-white font-bold uppercase select-none">
          {initials}
        </div>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-20">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <div className="border-t my-1"></div>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
