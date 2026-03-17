import { protectedRouteCheck } from "@/lib/session";
import Scanner from "./scanner";
import { Card } from "@/components/ui/card";

import RecentVisitsTable from "../dashboard/recentVisitsTable";

export default async function Page() {

    await protectedRouteCheck();

    return <div className="w-full flex justify-center">
        <Card className="mt-4 px-6 h-[72vh] w-[70vw] flex flex-row">
            <Scanner />
            <div className="h-full w-full overflow-y-scroll py-2">
                <RecentVisitsTable todayOnly />
            </div>
        </Card>
        </div>
}