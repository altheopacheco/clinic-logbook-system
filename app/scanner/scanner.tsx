"use client";

import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

import { createVisit } from "@/lib/actions/visits";
import { CardDescription } from "@/components/ui/card";

import "./video.css";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { formatName } from "@/lib/name-format";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Scanner() {

    const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
    const [selectedCam, setSelectedCam] = useState<string>("");
    const isCooldown = useRef(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const scannerRef = useRef<QrScanner>(null);

    const router = useRouter();

    useEffect(() => {
        QrScanner.listCameras(true).then(result => {
            setCameras(result);

            if (result.length > 0) {
                setSelectedCam(result[0].id); 
            }
        });
    }, []);

    useEffect(() => {
        const vidElement = document.getElementById("qr-reader") as HTMLVideoElement;

        const scanner = new QrScanner(
            vidElement,
            async result => {
                scannerRef.current?.pause(true);
                
                if (isCooldown.current) return;
                isCooldown.current = true; 
                setIsProcessing(true);

                toast.promise((async () => {
                    const visit = await createVisit(result.data);
                    if ('error' in visit) {
                        console.error(visit.error);
                        throw new Error(visit.error);
                    };
                    
                    return visit;
                })(), {
                    loading: "Processing QR Code...",
                    success: visit => <><p className="capitalize">{formatName(visit.studentName)}</p> logged {visit.type.toLowerCase()} successfully!</>,
                    error: _ => "QR Code Not Recognized."
                })
                .then(async() => {
                    router.refresh();
                    await new Promise(resolve => setTimeout(resolve, 3000));
                })
                .finally(() => {
                    isCooldown.current = false;
                    setIsProcessing(false);
                    scannerRef.current?.start();
                });
            },
            {
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,  
            }
        );

        scannerRef.current = scanner;
        scanner.start();

        return () => scanner.destroy();
    }, []);

    return <div className="w-full h-full text-center lg:col-span-2">
                <div className="text-start">
                    <p className="font-semibold text-sm">Select Camera</p>
                    <Select value={selectedCam} onValueChange={async (val) => {
                        if (val === selectedCam || !scannerRef.current) return;
                        
                        setSelectedCam(val);
                        
                        await scannerRef.current.stop();  
                        await scannerRef.current.setCamera(val);
                        await scannerRef.current.start(); 
                        
                        console.log("Selected " + val + " as camera device");
                    }}>
                        <SelectTrigger className="w-full max-w-48 md:mx-0 mx-auto my-2 self-start mb-3">
                            <SelectValue placeholder="Select Device" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Available Devices</SelectLabel>
                                {cameras.length == 0 ? "No Devices Available" : cameras.map(cam => (
                                    <SelectItem key={cam.id} value={cam.id} disabled={cam.id == selectedCam}>
                                        {cam.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="rounded-lg max-w-[23vw] max-h-[23vw] overflow-clip mb-3 bg-muted mx-auto">
                    <video id="qr-reader" className="aspect-square object-fill"></video>
                </div>
                <h1 className="text-2xl font-bold h-fit">{isProcessing ? "Processing..." : "Scan QR Here!"}</h1>
                <CardDescription>{isProcessing ? "Please wait" : "Please scan your Student ID here"}</CardDescription>
            </div>
}