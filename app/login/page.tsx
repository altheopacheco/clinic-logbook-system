"use client"

import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useState } from "react"

export default function LoginPage() {

    const session = useSession()

    console.log(session)

    if(session.status == 'authenticated') redirect("/scan");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        })

        if (res?.error) {
            console.log(res)
            setError("Invalid credentials") 
        } else {
            console.log();
            redirect("/scan");
        }
    } catch (err) {
        setError("" + err);
    }
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl">Clinic Staff Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-black text-white p-2 w-full">
          Login
        </button>
      </form>
    </main>
  )
}
