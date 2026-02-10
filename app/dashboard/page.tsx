import { protectedRouteCheck } from "@/lib/session";
import ActiveVisitsTable from "./activeVisitsTable";
import CompletedVisitsTable from "./completedVisitsTable";
import Cards from "./cards";

import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"

export default async function Page() {

    await protectedRouteCheck();

    return <main className="p-4 flex">
        <Cards />
        <div className="flex justify-center gap-x-4 w-full ml-4">
            <Card className="w-[40%] h-fit">
                <CardContent>
                    <CardTitle className="text-2xl mb-4">Active Visits</CardTitle>
                    <ActiveVisitsTable />
                </CardContent>
            </Card>
            <Card className="w-[60%] h-fit">
                <CardContent>
                    <CardTitle className="text-2xl mb-4">Completed Visits</CardTitle>
                    <CompletedVisitsTable />
                </CardContent>
            </Card>
        </div>
    </main>
}