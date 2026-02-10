import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button";
import { logout } from "@/lib/actions/auth";
import { getSession } from "@/lib/session";

export default async function Navbar() {
    const session = await getSession();
    return <nav className="py-2 px-4 border-b border-gray-300 flex justify-between items-center bg-slate-50">
        <Link href="/dashboard" className="flex items-center">
            <Image src="/logo.png" alt="PSHS-IRC Log" width={50} height={50}/>
            <h1 className="ml-2 font-semibold text-xl">Clinic Logbook System</h1>
        </Link>
        <div className="flex gap-x-4 mr-1 text-sm items-center font-semibold">
            <Link href="/dashboard" className="h-fit">Dashboard</Link>
            <Link href="/scanner" className="h-fit">Scanner</Link>
            {!session ?
                <Link href="/login"><Button>Login</Button></Link> :
                <Button onClick={logout}>Logout</Button>
            }
        </div>
    </nav>
}