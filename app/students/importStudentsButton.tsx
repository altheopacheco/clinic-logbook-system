"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserRoundPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { importStudents } from "@/lib/actions/students";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ImportStudentsButton() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: FormData) {
        await toast.promise(importStudents(e), {
            loading: "Importing student data...",
            success: "Sucessfully imported student data!",
            error: "Error importing student data."
        });
        setOpen(false);
    }

    return <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="">
                    <UserRoundPlus />
                    Import Students
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Import Students</DialogTitle>
                        <DialogDescription>
                        Import .xlsx file of student records containing their ID and Names
                        </DialogDescription>
                    </DialogHeader>
                        <Field className="mt-2">
                            <Label htmlFor="records">Student Records</Label>
                            <Input id="records" name="records" type="file" accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        </Field>
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button variant="outline" size="sm">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" size="sm" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Import"}
                            </Button>
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
}