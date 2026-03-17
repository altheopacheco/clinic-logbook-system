import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
import StudentsTable from "./studentsTable";
import prisma from "@/lib/prisma";
import StudentsPagination from "./studentsPagination";
import GradeLevelTabs from "./gradeLevelTabs";
import GradeLevelDropdown from "./gradeLevelTabs";
import GradeLevelSelect from "./gradeLevelSelect";

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
            <div className=" gap-2 w-full justify-between md:block hidden">
                <GradeLevelTabs />
            </div>
            <div className=" gap-2 w-full justify-between md:hidden block">
                <GradeLevelSelect />
            </div>
        </CardAction>
    </CardHeader>
    <CardContent>
        <StudentsTable gradeLevel={gradeLevel} students={students}/>
            <StudentsPagination totalPages={totalPages} /> 
    </CardContent>
 </Card>
}