"use server"

import { redirect } from "next/navigation";
import { signJwt } from "../jwt";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type LoginState = {
  error?: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {

  const data = Object.fromEntries(formData) as {
    username: string;
    password: string;
  };

  if (
    data.username !== process.env.SYSTEM_USER ||
    data.password !== process.env.SYSTEM_PASSWORD
  ) {
    return { error: "Invalid username or password" };
  }

  const token = signJwt({authorized: true});

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'session',
    value: token,
    httpOnly: true,
    maxAge: 60*60*12
  });

  redirect("/dashboard");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete({name: "session", path: "/"});
    console.log(cookieStore.getAll());
    revalidatePath("/login");
    redirect("/login");
}