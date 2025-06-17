export type UserAuth = {
  email: string;
  password: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function signup(user: UserAuth) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Signup failed");
  }
  return res.json();
}

export async function signin(user: UserAuth) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Signin failed");
  }
  return res.json();
}
