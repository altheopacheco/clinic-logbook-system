import CompletedVisitsTable from "./completedVisitsTable";
import Cards from "./cards";

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import ExportVisitsButton from "./exportVisitsButton";
import { GradeLevelVisitsChart } from "./gradeLevelVisitsChart";
import prisma from "@/lib/prisma";
import ActiveVisitsContent from "./activeVisitsContent";
import { Suspense } from "react";

type GradeData = {
    gradeLevel: number,
    visits: bigint
}

export default async function Page() {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const data = await prisma.$queryRaw<GradeData[]>`
        SELECT 
            student.gradeLevel,
            CAST(COUNT(visit.id) AS UNSIGNED) as visits
        FROM 
            visit
        JOIN
            student
        ON 
            student.id = visit.studentId
        WHERE
            visit.timeIn >= ${today}
            AND visit.timeIn < ${tomorrow}
        GROUP BY
            student.gradeLevel
    `;

    const processedData = data.map(v => ({gradeLevel: v.gradeLevel, visits: Number(v.visits)}))

    return <div className="grid md:grid-cols-4 grid-cols-2 items-start gap-4">
        <Cards />
        <GradeLevelVisitsChart data={processedData} />
        <Card className="flex-2 col-span-3 h-full">
            <CardContent className="overflow-auto">
                <Suspense fallback={<p className="text-center text-lg font-semibold text-muted-foreground">Loading Students In Clinic...</p>}>
                    <ActiveVisitsContent />
                </Suspense>
            </CardContent>
        </Card>
        <Card className="flex-3 max-h-[60vh] col-span-full">
            <CardContent className="overflow-y-scroll">
                <div className="flex justify-between">
                    <CardTitle className="text-xl mb-4">Visit History</CardTitle>
                    <ExportVisitsButton />
                </div>
                <CompletedVisitsTable />
            </CardContent>
        </Card>
    </div>
}