import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatName } from "@/lib/name-format";
import formatDuration from "@/lib/duration-format";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

type CompletedVisitsTableProps = {
    todayOnly?: boolean
}

export default async function CompletedVisitsTable({todayOnly}: CompletedVisitsTableProps) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completedVisits = await prisma.visit.findMany({
        where: {
            timeOut: {
                not: null
            },
            timeIn: todayOnly ? {
                gte: today
            } : undefined
        },
        include: {
            student: true
        },
        orderBy: [
            {timeOut: 'desc'},
            {timeIn: 'desc'}
        ]
    });

    return <Table id="completedVisitsTable">
      <TableCaption>A list of {todayOnly ? "Recent" : "Completed"} visits.</TableCaption>
      <TableHeader>
        <TableRow>  
          <TableHead>Name</TableHead>
          <TableHead>Time-In</TableHead>
          <TableHead>Time-Out</TableHead>
          {!todayOnly &&
            <TableHead>Date</TableHead>
          }
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {completedVisits.map(visit => {
          return <TableRow key={visit.id} className="">
              <TableCell className="p-2 capitalize">{formatName(visit.student.name)}</TableCell>
              <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                  timeStyle: 'short'
              }).format(visit.timeIn)}</TableCell>
              {
                  visit.timeOut && <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                      timeStyle: 'short'
                  }).format(visit.timeOut)}</TableCell>
              }
              {
                  !todayOnly && <TableCell className="p-2">
                            {visit.timeIn > today ? <Badge variant="default">Today</Badge> : <Badge variant="secondary">{new Intl.DateTimeFormat('en-PH', {
                            dateStyle: 'medium'
                        }).format(visit.timeIn)}
                        </Badge>}
                    
                  </TableCell>
              }
              <TableCell className="p-2">{(visit.timeOut && visit.timeIn) &&
                formatDuration(visit.timeOut.getTime() -visit.timeIn.getTime())
              }</TableCell>
          </TableRow>
          })
      }
      </TableBody>
    </Table>
}