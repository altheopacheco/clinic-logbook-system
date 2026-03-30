"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import { Prisma } from "@/generated/prisma/client";

import * as XLSX from 'xlsx';
import formatDuration from "@/lib/duration-format";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerWithRange from "@/components/date-picker-with-range";

export default function ExportVisitsButton({ visits, gradeLevel } : {
    gradeLevel: number,
    visits?: Prisma.VisitGetPayload<{
        include: {
        student: true
        }
    }>[]
}) {

    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleExport = async (filteredVisits: typeof visits) => {
        setLoading(true);

        if (!filteredVisits || filteredVisits.length === 0) {
            toast.error("No visit records for selected range");
            setLoading(false);
            return;
        }

        const data = filteredVisits.map(v => ({
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

        const toLabel = new Date(filteredVisits[0].timeIn).toLocaleDateString('en-PH', { dateStyle: "medium" });
        const fromLabel = new Date(filteredVisits[filteredVisits.length - 1].timeIn).toLocaleDateString('en-PH', { dateStyle: "medium" });
        const isAll = gradeLevel == 13;
        const gradeLabel = isAll ? "All Levels" : `Grade ${gradeLevel}`;

        const dateLabel = fromLabel === toLabel ? fromLabel : `${fromLabel}_to_${toLabel}`;

        XLSX.writeFile(workbook, `${dateLabel}_Visit_Records-${gradeLabel}.xlsx`);

        setLoading(false);
    };

    const handleSubmit = async (e: FormData) => {
        const dateFrom = e.get("dateFrom") as string;
        const dateTo = e.get("dateTo") as string;

        if (!dateFrom || !dateTo) {
            toast.error("Please select a date range.");
            return;
        }

        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999); // include all visits on the last day

        const filtered = visits?.filter(v => v.timeIn >= from && v.timeIn <= to);

        await toast.promise(handleExport(filtered), {
            loading: "Exporting visits...",
            success: "Successfully exported visit data!",
            error: "Error exporting data."
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="green" size="sm" disabled={isLoading}>
                    <FileSpreadsheet /> {isLoading ? "Exporting..." : "Export"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form action={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>Export Visit Records</DialogTitle>
                    <DialogDescription>
                    Select a date range for visit records to export
                    </DialogDescription>
                </DialogHeader>
                    <Field className="mt-2">
                        <Label htmlFor="records">Date Range</Label>
                        <DatePickerWithRange />
                    </Field>
                <DialogFooter className="mt-3">
                    <DialogClose asChild>
                        <Button variant="outline" size="sm">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" size="sm" disabled={isLoading}>
                        {isLoading ? "Exporting..." : "Export"}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}