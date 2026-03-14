import DashboardCard from "./dashboard-card"
import {Users, DoorOpen, Timer, ClockFading} from 'lucide-react'
import prisma from "@/lib/prisma"
import formatDuration from "@/lib/duration-format";

export default async function Cards() {

    const visits = await prisma.visit.findMany();

    const onSite = visits.filter(visit => !visit.timeOut);
    const completedVisits = visits.filter(v => v.timeOut != null);

    const avgDuration = completedVisits.length > 0 ? completedVisits.reduce((acc, curr) => 
        acc + (curr.timeOut!.getTime() - curr.timeIn.getTime()), 0
        ) / completedVisits.length : 0;

    return <div className="w-full flex mb-3 gap-3">
        <DashboardCard title="Total Visits Today" content={visits.length.toString()} Icon={Users}/>
        <DashboardCard title="Students In Clinic" content={onSite.length.toString()} Icon={DoorOpen}/>
        <DashboardCard title="Avg. Visit Duration" content={formatDuration(avgDuration)} Icon={ClockFading}/>
    </div>
}