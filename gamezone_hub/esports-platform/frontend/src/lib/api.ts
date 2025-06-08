export async function signup(email: string, password: string, role: string) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail || "Signup error")
  }
  return res.json()
}

export async function signin(email: string, password: string) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail || "Signin error")
  }
  return res.json()
}