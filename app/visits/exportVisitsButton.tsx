"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import { Prisma } from "@/generated/prisma/client";

import * as XLSX from 'xlsx';
import formatDuration from "@/lib/duration-format";

export default function ExportVisitsButton({ visits, gradeLevel } : {
    gradeLevel: number,
    visits?: Prisma.VisitGetPayload<{
        include: {
        student: true
        }
    }>[]
}) {

    const [isLoading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);

        if (!visits) {
            toast.error("No visit records");
            return
        };

        const data = visits.map(v => ({
            "Ref. Number": v.id,
            "Time In": v.timeIn,
            "Time Out": v.timeOut,
            Duration: v.timeOut ? 
                formatDuration(v.timeOut.getTime() - v.timeIn.getTime()) : "N/A",
            "Student ID": v.studentId,
            "Student Name": v.student.name,
            "Grade Level": v.student.gradeLevel
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Visit Records");

        worksheet["!cols"] = [
            { wch: 10 }, 
            { wch: 10 }, 
            { wch: 10 }, 
            { wch: 10 }, 
            { wch: 11 }, 
            { wch: 32 }, 
            { wch: 9 }, 
        ];

        const timestamp = new Date().toLocaleDateString('en-PH', {
            dateStyle: "medium"
        });

        const isAll = gradeLevel == 13;

        XLSX.writeFile(workbook, `${timestamp}_Visit_Records-` + (isAll ? "All Levels" : `Grade ${gradeLevel}`) + ".xlsx");

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
        <Button variant="green" size="sm" onClick={handleSubmit} disabled={isLoading}>
            <FileSpreadsheet /> {isLoading ? "Exporting..." : "Export"}
        </Button>
    );
}