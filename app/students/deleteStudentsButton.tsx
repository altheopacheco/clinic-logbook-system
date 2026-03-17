"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteAllStudents } from "@/lib/actions/students";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteStudentsButton() {

    async function handleSubmit() {
        await toast.promise(deleteAllStudents(), {
            loading: "Deleting student data....",
            success: "Student data sucessfully deleted!",
            error: "Error deleting student data."
        })
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon-sm">
                <Trash2 />
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete ALL Student Data?</AlertDialogTitle>
                <AlertDialogDescription>
                You are about to delete all student records. This action cannot be undone once completed.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit} variant="destructive" >Delete</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}