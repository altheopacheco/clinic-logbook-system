import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatName } from "@/lib/name-format";
import prisma from "@/lib/prisma";

export default async function ActiveVisitsTable() {

  const activeVisits = await prisma.visit.findMany({
        where: {
            timeOut: null
        },
        include: {
            student: true
        },
        orderBy: [
            {timeOut: 'desc'},
            {timeIn: 'desc'},
            {}
        ]
    });

    return <Table>
      <TableCaption>A list of students currently inside the clinic.</TableCaption>
      <TableHeader>
        <TableRow>  
          <TableHead>Time-In</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activeVisits.map(visit => {
            return <TableRow key={visit.id} className="">
                <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                    timeStyle: 'short'
                }).format(visit.timeIn)}</TableCell>
                <TableCell className="p-2 capitalize">{formatName(visit.student.name)}</TableCell>
                <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                    dateStyle: 'medium',
                }).format(visit.timeIn)}</TableCell>
            </TableRow>
            })
        }
      </TableBody>
    </Table>
}