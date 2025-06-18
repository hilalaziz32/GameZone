"use client";
import React, { useState } from "react";
import { signOut } from "../../actions/auth";
import { GoSignOut } from "react-icons/go";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <div className=" text-black sm:text-sm text-[10px] px-4 py-2 rounded-md cursor-pointer">
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading} className="flex items-center gap-2">
          <GoSignOut/>
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </div>
  );
};

export default Logout;
