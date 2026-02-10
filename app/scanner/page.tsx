import { protectedRouteCheck } from "@/lib/session";
import Scanner from "./scanner";

export default async function Page() {

    await protectedRouteCheck();

    return <Scanner />
}