import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import GradeLevelSelect from "./gradeLevelSelect";
import VisitsTable from "./visitsTable";
import DeleteStudentsButton from "./backupVisitsDataButton";
import ExportVisitsButton from "./exportVisitsButton";
import VisitsPagination from "./visitsPagination";

type StudentsTableCardProps = {
    gradeLevel?: number,
    page: number,
    rows: number
}

export default async function VisitsTableCard({gradeLevel, page = 1, rows = 15}: StudentsTableCardProps) {

    const visits = await prisma.visit.findMany({
        include: {
            student: true
        },
        where: {
            student: {
                gradeLevel: gradeLevel != 13 ? gradeLevel : undefined
            }
        },
        orderBy: [
            { timeOut: { sort: 'desc', nulls: 'first' } },
            { timeIn: 'desc' }
        ]
    });

    const totalPages = Math.ceil(visits.length / rows);

 return <Card>
    <CardHeader>
        <CardTitle className="text-2xl">{gradeLevel != 13 ?
            `Grade ${gradeLevel} Visits` : "All Visits"
        }</CardTitle>
        <CardDescription>{visits.length} Visits</CardDescription>
        <CardAction >
            <div className=" gap-2 w-full justify-between flex">
                <GradeLevelSelect />
                <ExportVisitsButton visits={visits} gradeLevel={gradeLevel || 13}/>
                <DeleteStudentsButton gradeLevel={gradeLevel || 13} />
            </div>
        </CardAction>
    </CardHeader>
    <CardContent>
        <VisitsTable gradeLevel={gradeLevel} visits={visits}/>
            <VisitsPagination totalPages={totalPages} /> 
    </CardContent>
 </Card>
}