import { protectedRouteCheck } from "@/lib/session";
import Scanner from "./scanner";
import { Card } from "@/components/ui/card";

import RecentVisitsTable from "../dashboard/recentVisitsTable";

export default async function Page() {

    await protectedRouteCheck();

    return <div className="w-full flex justify-center">
        <Card className="px-6 md:h-[82vh] w-[70vw] grid lg:grid-cols-5">
            <Scanner />
            <div className="h-full w-full overflow-y-scroll py-2 lg:col-span-3">
                <RecentVisitsTable todayOnly />
            </div>
        </Card>
        </div>
}