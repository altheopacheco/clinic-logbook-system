import DashboardCard from "./dashboard-card"
import {Users, DoorOpen} from 'lucide-react'
import prisma from "@/lib/prisma"

export default async function Cards() {

    const visits = await prisma.visit.findMany();

    const onSite = visits.filter(visit => !visit.timeOut);

    return <div className="w-[20%] space-y-4">
        <DashboardCard title="Visits" content={visits.length.toString()} Icon={Users}/>
        <DashboardCard title="On-Site" content={onSite.length.toString()} Icon={DoorOpen}/>
    </div>
}