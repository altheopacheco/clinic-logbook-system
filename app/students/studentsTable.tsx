import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StudentStatus } from "@/generated/prisma/enums";
import { formatName } from "@/lib/name-format";
import prisma from "@/lib/prisma";

const PAGE_SIZE = 20;

type StudentsTableProps = {
    gradeLevel?: number,
    students?: {
        gradeLevel: number;
        id: number;
        name: string;
        status: StudentStatus;
    }[] 
}

export default async function StudentsTable({gradeLevel, students}: StudentsTableProps) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return <Table id="completedVisitsTable">
      <TableCaption>{students ? `A list of all ${gradeLevel && "Grade " + gradeLevel} students` : `No Students Found`}</TableCaption>
      <TableHeader>
        <TableRow>  
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students && students.map(student => {
          return <TableRow key={student.id} className="">
              <TableCell className="p-2 capitalize">{student.id}</TableCell>
              <TableCell className="p-2 capitalize">{formatName(student.name)}</TableCell>
          </TableRow>
          })
        }
      </TableBody>
    </Table>
}