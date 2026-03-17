import ImportStudentsButton from "./importStudentsButton";
import StudentsTableCard from "./studentsTableCard";
import DeleteStudentsButton from "./deleteStudentsButton";

export default async function StudentsPage({
  searchParams
}: {
  searchParams: Promise<{ grade?: string, page?: string, rows?: string }>  
}) {
  const { grade, page, rows } = await searchParams;       
  const gradeLevel = grade ?? "7";

    return <div className="space-y-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Students</h1>
                <div className="space-x-2">
                    <ImportStudentsButton />
                    <DeleteStudentsButton />
                </div>
            </div>
            <StudentsTableCard 
                gradeLevel={parseInt(gradeLevel)} 
                page={parseInt(page ?? '1')} 
                rows={parseInt(rows ?? '15')}/>
          </div>
}