import VisitsTableCard from "./visitsTableCard";

export default async function StudentsPage({
  searchParams
}: {
  searchParams: Promise<{ grade?: string, page?: string, rows?: string }>  
}) {
  const { grade, page, rows } = await searchParams;       
  const gradeLevel = grade ?? "13";

    return <div className="space-y-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Visits</h1>
            </div>
            <VisitsTableCard 
                gradeLevel={parseInt(gradeLevel)} 
                page={parseInt(page ?? '1')} 
                rows={parseInt(rows ?? '25')}/>
          </div>
}