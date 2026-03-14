import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserRoundPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { importStudents } from "@/lib/actions/students";

export default function ImportStudentsButton() {
    return <Dialog>
                <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="">
                    <UserRoundPlus />
                    Import Students
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form action={importStudents}>
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
                        <DialogClose asChild>
                            <Button type="submit" size="sm">Import</Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
}