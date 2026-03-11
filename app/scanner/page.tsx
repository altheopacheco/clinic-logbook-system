import { protectedRouteCheck } from "@/lib/session";
import Scanner from "./scanner";
import QrScanner from "qr-scanner";
import { Card, CardTitle } from "@/components/ui/card";

import RecentVisitsTable from "../dashboard/recentVisitsTable";

export default async function Page() {

    await protectedRouteCheck();

    const cameras = await QrScanner.listCameras(true);

    return <div className="w-full flex justify-center">
        <Card className="mt-4 px-6 h-[81vh] w-[60vw] flex flex-row">
            <Scanner />
            <div className="h-full w-full overflow-y-scroll py-2">
                <RecentVisitsTable />
            </div>
        </Card>
        </div>
}