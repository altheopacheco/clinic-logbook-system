"use client";

import {Html5QrcodeScanner} from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

import { createVisit } from "@/lib/actions/visits";

const IDLE_MESSAGE = "Scan Student QR Code Here"

export default function Page() {
    const [msg, setMsg] = useState(IDLE_MESSAGE);
    const [qrData, setQrData] = useState(null);
    const isCooldown = useRef(false);

    useEffect(() => {
        let scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 300, height: 300 },
                aspectRatio: 1.0
            },
            false
        );

        async function onScanSuccess(text: any, _result: any) {

            if (isCooldown.current) return;

            isCooldown.current = true;
            setMsg(`Processing...`);
            scanner.pause(true);

            const visit = await createVisit(text);   

            console.log(visit);

            setMsg(`Scan Succesful!`);
            setQrData(text);

            setTimeout(() => {
                isCooldown.current = false;
                setMsg(IDLE_MESSAGE);
                scanner.resume();
            }, 7000)
        }

        function onScanFailure(error: any) {
            setMsg(IDLE_MESSAGE)
            setQrData(null);
            console.warn(error);
        }

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            scanner.clear().catch(() => {});
        };
    }, []);

    return <main className="flex flex-col items-center mt-4">
        <div id="reader" className="w-[350] mx-auto aspect-square overflow-hidden rounded-md"></div>
        <h1>{msg}</h1>
        <h1>{qrData}</h1>
    </main>
}