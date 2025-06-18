"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function padSeconds(t: string | undefined): string {
  if (!t) return "";
  if (/^\d{2}:\d{2}:\d{2}$/.test(t)) return t;
  if (/^\d{2}:\d{2}$/.test(t)) return t + ":00";
  return t;
}

type Region = {
  id: number | string; // or whatever type 'id' is
  name: string;
};


const PAKISTAN_PHONE_REGEX = /^(\+92[0-9]{10}|03[0-9]{9})$/;

export default function RegisterZonePage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [form, setForm] = useState({
    p_user_id: "",
    p_region_id: "",
    p_name: "",
    p_address: "",
    p_open_time: "",
    p_close_time: "",
    p_description: "",
    p_phone_number: "",
  });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndRegions() {
      const userRes = await fetch("/api/session");
      const { user } = await userRes.json();
      if (!user) {
        setErr("You must be logged in.");
        return;
      }
      setForm((f) => ({ ...f, p_user_id: user.id }));
      const { data, error } = await supabase.from("regions").select("id, name");
      if (error) setErr("Failed to fetch regions");
      else setRegions(data || []);
    }
    fetchUserAndRegions();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setIsSubmitting(true);

    const payload = {
      ...form,
      p_open_time: padSeconds(form.p_open_time),
      p_close_time: padSeconds(form.p_close_time),
    };

    // Basic validation, only on client
    if (
      !payload.p_user_id ||
      !payload.p_region_id ||
      !payload.p_name ||
      !payload.p_address ||
      !payload.p_open_time ||
      !payload.p_close_time ||
      !payload.p_phone_number
    ) {
      setErr("All fields except description are required.");
      setIsSubmitting(false);
      return;
    }

    if (!PAKISTAN_PHONE_REGEX.test(payload.p_phone_number)) {
      setErr("Invalid phone number. Use +92XXXXXXXXXX or 03XXXXXXXXX");
      setIsSubmitting(false);
      return;
    }

    // Instantly redirect (don't wait for backend)
    setTimeout(() => {
      router.push("/zones");
    }, 3000);


    // Fire API call in background (no await, no error handling)
    fetch("/api/zones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Register New Zone
          </h1>
          <p className="text-gray-600">Create your business zone in a few simple steps</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Region Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Region *
              </label>
              <div className="relative">
                <select
                  name="p_region_id"
                  value={form.p_region_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 appearance-none text-gray-800 font-medium"
                >
                  <option value="">Choose your region</option>
                  {regions.map((r) => (
                    <option value={r.id} key={r.id}>{r.name}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Zone Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Zone Name *
              </label>
              <input
                name="p_name"
                value={form.p_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400"
                placeholder="Enter zone name"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address *
              </label>
              <input
                name="p_address"
                value={form.p_address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400"
                placeholder="Enter complete address"
              />
            </div>

            {/* Operating Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Opening Time *
                </label>
                <input
                  type="time"
                  name="p_open_time"
                  value={form.p_open_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Closing Time *
                </label>
                <input
                  type="time"
                  name="p_close_time"
                  value={form.p_close_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                name="p_phone_number"
                value={form.p_phone_number}
                onChange={handleChange}
                required
                placeholder="+92XXXXXXXXXX or 03XXXXXXXXX"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="p_description"
                value={form.p_description}
                onChange={handleChange}
                placeholder="Tell us about your zone..."
                rows={4}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400 resize-none"
              />
            </div>

            {/* Error/Success Messages */}
            {err && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{err}</p>
              </div>
            )}

            {msg && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-700 font-medium">{msg}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Zone...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Register Zone</span>
                </span>
              )}

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have a zone? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">View all zones</span>
        </p>
      </div>
    </div>
  );
}