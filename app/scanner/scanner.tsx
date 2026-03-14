"use client";

import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

import { createVisit } from "@/lib/actions/visits";
import { usePathname } from "next/navigation";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "./video.css";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

const IDLE_MESSAGE = "Scan Student QR Code Here"

export default function Scanner() {

    const [msg, setMsg] = useState(IDLE_MESSAGE);
    const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
    const [selectedCam, setSelectedCam] = useState<string>("");
    const isCooldown = useRef(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const scannerRef = useRef<QrScanner>(null);

    const router = useRouter();

    useEffect(() => {

        QrScanner.listCameras(true).then(result => setCameras(result));

        const vidElement = document.getElementById("qr-reader") as HTMLVideoElement;

        const scanner = new QrScanner(
            vidElement,
            async result => {
                if (isCooldown.current) return;
                isCooldown.current = true; 
                setIsProcessing(true);

                scannerRef.current?.pause(false);

                // const visit = await createVisit(result.data);

                toast.promise((async () => {
                    const visit = await createVisit(result.data);
                    if ('error' in visit) throw new Error(visit.error);
                    
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    return visit;
                })(), {
                    loading: "Processing QR Code...",
                    success: visit => <b>{visit.studentName} logged {visit.type} successfully!</b>,
                    error: err => <b>Something went wrong: {err.message}</b>
                })
                .then(() => {
                    router.refresh();
                })
                .finally(() => {
                    isCooldown.current = false;
                    setIsProcessing(false);
                    scannerRef.current?.start();
                });
            },
            {
                highlightScanRegion: true,
                highlightCodeOutline: true,  
            }
        );

        scannerRef.current = scanner;
        scanner.start();
    }, []);

    useEffect(() => {
        if (!scannerRef.current) return;

        if (cameras.length > 0) {
            scannerRef.current.setCamera(cameras[0].id);
            setSelectedCam(cameras[0].id);
        }

    }, []);

    return <div className="w-fit h-full text-center">
                <Select value={selectedCam} onValueChange={val => {
                    if (val == selectedCam) return;

                    setSelectedCam(val);
                    scannerRef.current?.setCamera(val);
                    console.log("Selected " + val + " as cameraa device");
                }}>
                    <SelectTrigger className="w-full max-w-48 self-start mb-3">
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
                <div className="rounded-lg w-[23vw] h-[23vw] overflow-clip mb-3 bg-muted">
                    <video id="qr-reader" className="aspect-square object-fill"></video>
                </div>
                
                <h1 className="text-3xl font-bold h-fit">{isProcessing ? "Processing..." : "Scan Here!"}</h1>
                <CardDescription>{isProcessing ? "Please wait.x" : "Scan your ID here"}</CardDescription>
            </div>
}