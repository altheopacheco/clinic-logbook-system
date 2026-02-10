import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";

export default async function ActiveVisitsTable() {

  const activeVisits = await prisma.visit.findMany({
        where: {
            timeOut: null
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
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activeVisits.map(visit => {
            return <TableRow key={visit.id} className="">
                <TableCell className="p-2">{visit.student.name}</TableCell>
                <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                    timeStyle: 'medium'
                }).format(visit.timeIn)}</TableCell>
                <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                    dateStyle: 'short',
                }).format(visit.timeIn)}</TableCell>
            </TableRow>
            })
        }
      </TableBody>
    </Table>
}