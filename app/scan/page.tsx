'use client'

import { redirect } from "next/navigation"

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react";

export default function Page() {

    const session = useSession();

    if (session.status == 'unauthenticated') {
        console.log("hi")
        redirect("/login")
    }

    const [msg, setMsg] = useState("Scan QR Code!");

    const [code, setCode] = useState("");

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "scanner",
            {fps: 10, qrbox: 250},
            false
        )

        scanner.render(
            async(scannedData) => {

                scanner.pause(true);

                setMsg("Processing...");

                try {
                    await fetch("/api/visits", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            studentNumber: scannedData,
                            staffId: "1",
                        }),
                    })

                    setCode(scannedData);

                    setMsg("Scan successful")
                } catch {
                    setMsg("Scan failed")
                }

                await new Promise(resolve => setTimeout(resolve, 3000));

                scanner.resume()
            },
            (error) => {
                
            }
        )

        
        
        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);
    
    return (
        <main>
            <h1>Clinic LogBook</h1>
            <div id="scanner" className="w-80"></div>
            <p>{msg}</p>
            <p>Student Number: {code}</p>
             <button >Logout</button>
        </main>
    )
}