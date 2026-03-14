import ImportStudentsButton from "./importStudentsButton";
import StudentsTableCard from "./studentsTableCard";
import GradeLevelTabs from "./gradeLevelTabs";
import { Button } from "@/components/ui/button";
import { CircleEllipsis, EllipsisVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import prisma from "@/lib/prisma";
import { deleteAllStudents } from "@/lib/actions/students";

export default async function StudentsPage({
  searchParams
}: {
  searchParams: Promise<{ grade?: string, page?: string, rows?: string }>  
}) {
  const { grade, page, rows } = await searchParams;       
  const gradeLevel = grade ?? "7";

    return <div className="space-y-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Students</h1>
                <div className="space-x-2">
                    <ImportStudentsButton />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon-sm">
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
                          <form>
                            <AlertDialogAction type="submit" variant="destructive" formAction={deleteAllStudents}>Delete</AlertDialogAction>
                          </form>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <StudentsTableCard 
                gradeLevel={parseInt(gradeLevel)} 
                page={parseInt(page ?? '1')} 
                rows={parseInt(rows ?? '15')}/>
          </div>
}