"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { useEffect, useRef } from "react"

export default function ExportVisitsButton() {

    const handleExport = () => {
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
        a.click();
        URL.revokeObjectURL(url);
    };

    return <Button variant="outline" size="sm" onClick={handleExport}>
            <FileSpreadsheet /> Export
        </Button>
}