import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
import StudentsTable from "./studentsTable";
import prisma from "@/lib/prisma";
import StudentsPagination from "./studentsPagination";
import GradeLevelTabs from "./gradeLevelTabs";
import ImportStudentsButton from "./importStudentsButton";

type StudentsTableCardProps = {
    gradeLevel?: number,
    page: number,
    rows: number
}

export default async function StudentsTableCard({gradeLevel, page = 1, rows = 15}: StudentsTableCardProps) {

    const [students, total] = await prisma.$transaction([
        prisma.student.findMany({
        where: { gradeLevel },
        orderBy: [{ gradeLevel: 'asc' }, { id: 'asc' }, {name: 'asc'}],
        skip: (page - 1) * rows,
        take: rows,
        }),
        prisma.student.count({ where: { gradeLevel } })
    ]);

    const totalPages = Math.ceil(total / rows);

 return <Card>
    <CardHeader>
        <CardTitle className="text-2xl">Grade {gradeLevel}</CardTitle>
        <CardDescription>{total} Students</CardDescription>
        <CardAction>
            <div className="flex gap-2 w-full justify-between">
                <GradeLevelTabs />
            </div>
        </CardAction>
    </CardHeader>
    <CardContent>
        <StudentsTable gradeLevel={gradeLevel} students={students}/>
            <StudentsPagination totalPages={totalPages} /> 
    </CardContent>
 </Card>
}