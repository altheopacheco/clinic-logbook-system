import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button";
import { logout } from "@/lib/actions/auth";
import { getSession } from "@/lib/session";
import { LogOut, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default async function Navbar() {
    const session = await getSession();

    return <nav className="py-2 px-4 border-b flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
            <Image src="/logo.png" alt="PSHS-IRC Clinic Logo" width={50} height={50} className="dark:hidden block"/>
            <Image src="/logo-reverse.png" alt="PSHS-IRC Clinic Logo Dark Mode" width={50} height={50} className="dark:block hidden"/>
            <h1 className="ml-2 font-semibold text-xl">Clinic Logbook System</h1>
        </Link>
        <div className="flex gap-x-4 mr-1 text-sm items-center font-semibold">
            
          <ModeToggle />
            {session &&
                <>
                    <Link href="/dashboard" className="h-fit md:block hidden">Dashboard</Link>
                    <Link href="/students" className="h-fit md:block hidden">Students</Link>
                    <Link href="/scanner" className="h-fit md:block hidden">Scanner</Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="md:hidden block">
                        <Button variant="outline" size="icon-sm" >
                          <Menu />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Pages</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href="/dashboard" className="h-fit">Dashboard</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href="/students" className="h-fit">Students</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href="/scanner" className="h-fit">Scanner</Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="w-full" size='sm'>Logout</Button>
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
                      </DropdownMenuContent>
                    </DropdownMenu>
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