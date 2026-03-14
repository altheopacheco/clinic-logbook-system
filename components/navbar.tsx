import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button";
import { logout } from "@/lib/actions/auth";
import { getSession } from "@/lib/session";
import { LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export default async function Navbar() {
    const session = await getSession();

    return <nav className="py-2 px-4 border-b-2 border-accent flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
            <Image src="/logo.png" alt="PSHS-IRC Log" width={50} height={50}/>
            <h1 className="ml-2 font-semibold text-xl">Clinic Logbook System</h1>
        </Link>
        <div className="flex gap-x-4 mr-1 text-sm items-center font-semibold">
            
            {session &&
                <>
                    <Link href="/dashboard" className="h-fit">Dashboard</Link>
                    <Link href="/students" className="h-fit">Students</Link>
                    <Link href="/scanner" className="h-fit">Scanner</Link>
                    <ModeToggle />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="default" size="icon-sm">
                            <LogOut />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Log Out?</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you wish to log out?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <form>
                            <AlertDialogAction type="submit" variant="destructive" onClick={logout}>Logout</AlertDialogAction>
                          </form>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </>
            }
        </div>
    </nav>
}