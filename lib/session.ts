import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
    const cookieStore = await cookies();
    if (!cookieStore.get("session") || cookieStore.get("session")?.value == '') {
        console.log("No session");
        return null;
    } else {
        console.log("Session " + cookieStore.get("session"));
        return cookieStore.get("session");
    }
}

export async function protectedRouteCheck() {
    if (!await getSession()) {
        redirect("/login");
    }
}