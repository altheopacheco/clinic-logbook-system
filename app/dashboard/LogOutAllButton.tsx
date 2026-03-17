"use client"

import { Button } from "@/components/ui/button"
import { clearVisits } from "@/lib/actions/visits";
import prisma from "@/lib/prisma";
import { Users2 } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    activeVisits: Awaited<ReturnType<typeof prisma.visit.findMany<{
        include: { student: true }
    }>>>
}

export default function LogOutAllButton({activeVisits}: Props) {

    const [isLoading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        
        await clearVisits(activeVisits);

        setLoading(false);
    };

    const handleSubmit = async () => {
        await toast.promise(handleExport(), {
            loading: "Clearing visits...",
            success: "Sucessfully cleared visit data!",
            error: "Error clearing data."
        });
    }

    return (
        <Button variant="default" size="sm" onClick={handleSubmit} disabled={isLoading || activeVisits.length == 0}>
            <Users2 /> {isLoading ? "Clearing..." : "Clear Logs"}
        </Button>
    );
}