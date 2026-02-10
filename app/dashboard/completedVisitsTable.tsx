import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";

export default async function CompletedVisitsTable() {

    const completedVisits = await prisma.visit.findMany({
        where: {
            timeOut: {
                not: null
            }
        },
        include: {
            student: true
        }
    });

    return <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>  
          <TableHead>Name</TableHead>
          <TableHead>Time-In</TableHead>
          <TableHead>Time-Out</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {completedVisits.map(visit => {
          return <TableRow key={visit.id} className="">
              <TableCell className="p-2">{visit.student.name}</TableCell>
              <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                  timeStyle: 'medium'
              }).format(visit.timeIn)}</TableCell>
              {
                  visit.timeOut && <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                      timeStyle: 'medium'
                  }).format(visit.timeOut)}</TableCell>
              }
              {
                  visit.timeIn && <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                      dateStyle: 'medium'
                  }).format(visit.timeIn)}</TableCell>
              }
              <TableCell className="p-2">{visit.duration} min(s)</TableCell>
          </TableRow>
          })
      }
      </TableBody>
    </Table>
}