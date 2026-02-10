"use client";

import {Html5QrcodeScanner} from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

import { createVisit } from "@/lib/actions/visits";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Card, CardDescription } from "@/components/ui/card";

const IDLE_MESSAGE = "Scan Student QR Code Here"

export default function Scanner() {

    const pathName = usePathname();

    const [msg, setMsg] = useState(IDLE_MESSAGE);
    const [qrData, setQrData] = useState(null);

    const isInit = useRef(false);
    const isCooldown = useRef(false);

    useEffect(() => {
        isInit.current = false;
    }, [pathName])

    useEffect(() => {
        setTimeout(() => {
            if (isInit.current) {
                return;
            }

            isInit.current = true;

            const scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
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
                // setMsg(IDLE_MESSAGE)
                // setQrData(null);
                // console.warn(error);
            }

            scanner.render(onScanSuccess, onScanFailure);

            return () => {
                scanner.clear().catch(() => {});
            };
        }, 500);
    }, []);

    return <main className="flex flex-col items-center">
        <Card className="flex flex-col items-center mt-4 px-6 max-h-[80vh]">
            <h1 className="text-3xl font-bold h-fit">QR Scanner</h1>
            <CardDescription>{msg}</CardDescription>
            <div id="reader" className="w-[320] mx-auto aspect-square overflow-hidden rounded-md"></div>
        </Card>
    </main>
}