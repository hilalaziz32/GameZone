"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function padSeconds(t: string) {
  if (!t) return "";
  // Already in HH:MM:SS format
  if (/^\d{2}:\d{2}:\d{2}$/.test(t)) return t;
  // HH:MM -> HH:MM:00
  if (/^\d{2}:\d{2}$/.test(t)) return t + ":00";
  return t;
}

export default function RegisterZonePage() {
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({
    p_user_id: "",
    p_region_id: "",
    p_name: "",
    p_address: "",
    p_open_time: "",
    p_close_time: "",
    p_description: "",
  });
  const [err, setErr] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();

  // Get user session and regions on mount
  useEffect(() => {
    async function fetchUserAndRegions() {
      // Get user from your API (which uses getUserSession)
      const userRes = await fetch('/api/session');
      const { user } = await userRes.json();
      if (!user) {
        setErr("You must be logged in.");
        return;
      }
      setForm((f) => ({ ...f, p_user_id: user.id }));

      // Get regions from Supabase
      const { data, error } = await supabase.from("regions").select("id, name");
      if (error) setErr("Failed to fetch regions");
      else setRegions(data || []);
    }
    fetchUserAndRegions();
  }, []);

  function handleChange(e: any) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErr("");
    setMsg("");

    // Convert times to HH:MM:SS
    const payload = {
      ...form,
      p_open_time: padSeconds(form.p_open_time),
      p_close_time: padSeconds(form.p_close_time),
    };

    if (
      !payload.p_user_id ||
      !payload.p_region_id ||
      !payload.p_name ||
      !payload.p_address ||
      !payload.p_open_time ||
      !payload.p_close_time
    ) {
      setErr("All fields except description are required.");
      return;
    }

    const res = await fetch("/api/zones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      let errorMsg = "Failed to register zone";
      if (data.detail) {
        if (typeof data.detail === "string") errorMsg = data.detail;
        else if (Array.isArray(data.detail) && data.detail[0]?.msg) errorMsg = data.detail[0].msg;
        else if (data.detail.msg) errorMsg = data.detail.msg;
        else errorMsg = JSON.stringify(data.detail);
      }
      setErr(errorMsg);
      return;
    }
    setMsg("Zone registered!");
    setForm({
      ...form,
      p_region_id: "",
      p_name: "",
      p_address: "",
      p_open_time: "",
      p_close_time: "",
      p_description: "",
    });
    router.push("/zones");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 text-black">
        {/* Region Dropdown */}
        <select
          name="p_region_id"
          value={form.p_region_id}
          onChange={handleChange}
          required
          className="input border border-gray-500 rounded-md p-3 w-full"
        >
          <option value="">Select Region</option>
          {regions.map((r) => (
            <option value={r.id} key={r.id}>{r.name}</option>
          ))}
        </select>
        <input
          name="p_name"
          value={form.p_name}
          onChange={handleChange}
          required
          className="input border border-gray-500 rounded-md p-2 w-full"
          placeholder="Zone Name"
        />
        <input
          name="p_address"
          value={form.p_address}
          onChange={handleChange}
          required
          className="input border border-gray-500 rounded-md p-2 w-full"
          placeholder="Address"
        />
        <input
          type="time"
          name="p_open_time"
          value={form.p_open_time}
          onChange={handleChange}
          required
          placeholder="Open Time"
          className="input border border-gray-500 rounded-md p-2 w-full"
        />
        <input
          type="time"
          name="p_close_time"
          value={form.p_close_time}
          onChange={handleChange}
          required
          placeholder="Close Time"
          className="input border border-gray-500 rounded-md p-2 w-full"
        />
        <textarea
          name="p_description"
          value={form.p_description}
          onChange={handleChange}
          placeholder="Description"
          className="input border border-gray-500 rounded-md p-2 w-full"
        ></textarea>
        {err && <p className="text-red-500">{err}</p>}
        {msg && <p className="text-green-500">{msg}</p>}
        <button className="btn-primary bg-blue-600 text-white w-full p-3 rounded-md">
          Register Zone
        </button>
      </form>
    </div>
  );
}
