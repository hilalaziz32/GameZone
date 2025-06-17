"use client";

import SignUpForm from "@/components/SignUpForm";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { z } from "zod";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const schema = z.object({
//   email: z.string().email({ message: "Enter a valid email" }),
//   password: z.string().min(6, { message: "Password must be at least 6 chars" }),
//   confirmPassword: z.string(),
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

export default function SignupPage() {
  // const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  // const [err, setErr] = useState<{ email?: string, password?: string, confirmPassword?: string, global?: string }>({});
  // const [loading, setLoading] = useState(false);
  // const [showPwd, setShowPwd] = useState(false);
  // const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  // const router = useRouter();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  //   setErr(prev => ({ ...prev, [e.target.name]: undefined, global: undefined }));
  // };

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setErr({});
  //   // Zod validation
  //   const result = schema.safeParse(form);
  //   if (!result.success) {
  //     const fieldErrors: any = {};
  //     for (const issue of result.error.issues) {
  //       fieldErrors[issue.path[0]] = issue.message;
  //     }
  //     setErr(fieldErrors);
  //     return;
  //   }
  //   setLoading(true);
  //   // API call
  //   const res = await fetch("/api/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email: form.email, password: form.password }),
  //   });
  //   router.push("/check-email");
  //   setLoading(false);
  // }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 sm:px-0 px-3">
      <SignUpForm />
    </div>
  );
}