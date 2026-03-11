import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatName } from "@/lib/name-format";
import prisma from "@/lib/prisma";

export default async function CompletedVisitsTable() {

    const completedVisits = await prisma.visit.findMany({
        include: {
            student: true
        },
        orderBy: [
            {timeIn: 'desc'},
            {timeOut: 'desc'}
        ]
    });

    return <Table>
      <TableCaption>A list of recent visits.</TableCaption>
      <TableHeader>
        <TableRow>  
          <TableHead>Name</TableHead>
          <TableHead>Time-In</TableHead>
          <TableHead>Time-Out</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {completedVisits.map(visit => {
          return <TableRow key={visit.id} className="">
              <TableCell className="p-2 capitalize">{formatName(visit.student.name)}</TableCell>
              <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                  timeStyle: 'medium'
              }).format(visit.timeIn)}</TableCell>
              {
                  visit.timeOut ? <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                      timeStyle: 'medium'
                  }).format(visit.timeOut)}</TableCell> : 
                  <TableCell className="p-2">Ongoing</TableCell>
              }
          </TableRow>
          })
      }
      </TableBody>
    </Table>
}