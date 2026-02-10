import DashboardCard from "./dashboard-card"
import {Users} from 'lucide-react'

export default function Cards() {
    return <div className="w-[20%] space-y-4">
        <DashboardCard title="Visits" content="21" Icon={Users}/>
        <DashboardCard title="On-Site" content="4" Icon={Users}/>
    </div>
}