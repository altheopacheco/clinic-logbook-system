import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatName } from "@/lib/name-format";
import { Prisma } from "../generated/prisma/client";
import prisma from "@/lib/prisma";

type Props = {
    activeVisits: Awaited<ReturnType<typeof prisma.visit.findMany<{
        include: { student: true }
    }>>>
}

export default async function ActiveVisitsTable({activeVisits}: Props
) {

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