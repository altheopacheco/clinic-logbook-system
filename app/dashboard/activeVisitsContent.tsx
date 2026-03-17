import { CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import ActiveVisitsTable from "./activeVisitsTable";
import LogOutAllButton from "./LogOutAllButton";

export default async function ActiveVisitsContent() {
    const activeVisits = await prisma.visit.findMany({
            where: {
                timeOut: null
            },
            include: {
                student: true
            },
            orderBy: [
                {timeOut: 'desc'},
                {timeIn: 'desc'},
            ]
        });

    return (
        <>
        <div className="flex justify-between">
            <CardTitle className="text-xl mb-4">Students In Clinic</CardTitle>
            <LogOutAllButton activeVisits={activeVisits} />
        </div>
            <ActiveVisitsTable activeVisits={activeVisits}/>
        </>
    )
}