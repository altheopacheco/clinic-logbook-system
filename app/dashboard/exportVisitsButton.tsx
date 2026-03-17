"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";

export default function ExportVisitsButton() {

    const [isLoading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        const table = document.getElementById("completedVisitsTable");
        if (!table) return;

        const html = `
            <html>
                <head><meta charset="utf-8"></head>
                <body>${table.outerHTML}</body>
            </html>
        `;

        const blob = new Blob([html], { type: "application/vnd.ms-excel" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "visitsTable.xls";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => URL.revokeObjectURL(url), 150);
        setLoading(false);
    };

    const handleSubmit = async () => {
        await toast.promise(handleExport(), {
            loading: "Exporting visits...",
            success: "Sucessfully exported visit data!",
            error: "Error exporting data."
        });
    }

    return (
        <Button variant="default" size="sm" onClick={handleSubmit} disabled={isLoading}>
            <FileSpreadsheet /> {isLoading ? "Exporting..." : "Export"}
        </Button>
    );
}