import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return <nav className="py-1.5 px-4 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center">
            <Image src="/logo.png" alt="PSHS-IRC Log" width={50} height={50}/>
            <h1 className="ml-2 font-bold text-xl">Clinic Logbook System</h1>
        </div>
        <div className="flex gap-x-4 mr-1 text-sm">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/scanner">Scanner</Link>
            <Link href="/login">Login</Link>
        </div>
    </nav>
}