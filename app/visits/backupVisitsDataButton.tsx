"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { backupDatabase } from "@/lib/actions/db";
import { RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function BackupVisitsDataButton({gradeLevel} : {
    gradeLevel: number
}) {

    async function handleSubmit() {
        await toast.promise(backupDatabase(), {
            loading: "Backing up visit records...",
            success: "Visit records sucessfully backed up!",
            error: "Error backing up visit records."
        })
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="default" size="sm">
                <RefreshCcw /> <p className="md:block hidden">Backup Data</p>
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Backup ALL {gradeLevel != 13 && `Grade ${gradeLevel}`} Visit Records?</AlertDialogTitle>
                <AlertDialogDescription>
                You are about to backup all {gradeLevel != 13 && `grade ${gradeLevel}`} visit records. This action cannot be undone once completed.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit} variant="default" >Backup</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}