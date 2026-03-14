import { protectedRouteCheck } from "@/lib/session";
import ActiveVisitsTable from "./activeVisitsTable";
import CompletedVisitsTable from "./completedVisitsTable";
import Cards from "./cards";

import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import ExportVisitsButton from "./exportVisitsButton";



export default async function Page() {

    await protectedRouteCheck();

    return <div className="">
        <Cards />
        <div className="flex gap-x-4">
            <Card className="flex-2 max-h-[60vh]">
                <CardContent className="overflow-auto">
                    <CardTitle className="text-xl mb-4">Active Visits</CardTitle>
                    <ActiveVisitsTable />
                </CardContent>
            </Card>
            <Card className="flex-3 max-h-[60vh]">
                <CardContent className="overflow-y-scroll">
                    <div className="flex justify-between">
                        <CardTitle className="text-xl mb-4">Completed Visits</CardTitle>
                        <ExportVisitsButton />
                    </div>
                    <CompletedVisitsTable />
                </CardContent>
            </Card>
        </div>
    </div>
}