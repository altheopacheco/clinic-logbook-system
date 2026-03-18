import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Prisma } from "@/generated/prisma/browser";
import formatDuration from "@/lib/duration-format";
import { formatName } from "@/lib/name-format";

const PAGE_SIZE = 20;

type VisitsTableProps = {
    gradeLevel?: number,
    visits?: Prisma.VisitGetPayload<{
      include: {
        student: true
      }
    }>[]
}

export default async function VsitsTable({gradeLevel, visits}: VisitsTableProps) {

    return <Table id="completedVisitsTable">
      <TableCaption>{visits && visits.length > 0 ? 
        "A list of all " + ((gradeLevel != 13) ? "Grade " + gradeLevel : "") + " visits" : 
        `No Visits Found`
        }</TableCaption>
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
        {visits && visits.map(visit => {
          return <TableRow key={visit.id} className="">
              <TableCell className="p-2 capitalize">{formatName(visit.student.name)}</TableCell>
              <TableCell className="p-2 capitalize">{new Intl.DateTimeFormat('en-PH', {
                      timeStyle: 'short'
                  }).format(visit.timeIn)}</TableCell>
                {
                  visit.timeOut ? <TableCell className="p-2">{new Intl.DateTimeFormat('en-PH', {
                      timeStyle: 'short'
                  }).format(visit.timeOut)}</TableCell> : <TableCell>
                    <Badge className="bg-yellow-400">Ongoing</Badge>
                  </TableCell>
               }
               <TableCell className="p-2 capitalize">{new Intl.DateTimeFormat('en-PH', {
                    dateStyle: 'medium'
                }).format(visit.timeIn)}</TableCell>
                {visit.timeOut ?
                  <TableCell className="p-2">{(visit.timeOut && visit.timeIn) &&
                    formatDuration(visit.timeOut.getTime() -visit.timeIn.getTime())
                  }</TableCell> : 
                  <TableCell className="pl-2">---</TableCell>
                }
          </TableRow>
          })
        }
      </TableBody>
    </Table>
}