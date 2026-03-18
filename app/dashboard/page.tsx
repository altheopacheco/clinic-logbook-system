import CompletedVisitsTable from "./completedVisitsTable";
import Cards from "./cards";

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import ExportVisitsButton from "../visits/exportVisitsButton";
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

    return <div className="">
        <Cards />
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
            <Card className="flex-2 col-span-full lg:col-span-2 flex flex-col">
                <CardContent className="overflow-auto flex-1">
                    <Suspense fallback={<p className="text-center text-lg font-semibold text-muted-foreground">Loading Students In Clinic...</p>}>
                        <ActiveVisitsContent />
                    </Suspense>
                </CardContent>
            </Card>
            {/* <GradeLevelVisitsChart data={processedData} /> */}
            <Card className="flex-3 max-h-[60vh] col-span-full md:col-span-2">
                <CardContent className="overflow-y-scroll">
                    <div className="flex justify-between">
                        <CardTitle className="text-xl mb-4">Completed Visits - Today</CardTitle>
                    </div>
                    <CompletedVisitsTable todayOnly />
                </CardContent>
            </Card>
        </div>
    </div>
}