import prisma from "@/lib/prisma"

export default async function Page() {

    const activeVisits = await prisma.visit.findMany({
        where: {
            timeOut: null
        },
        include: {
            student: true
        }
    });

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

    return <main className="p-4 flex justify-center gap-x-8">
        <div className="text-center">
            <h1 className="text-2xl">Active Visits</h1>
            <table className="mt-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time In</th>
                    </tr>
                </thead>
                <tbody>
                    {activeVisits.map(visit => {
                        return <tr key={visit.id} className="">
                            <td className="p-2">{visit.student.name}</td>
                            <td className="p-2">{new Intl.DateTimeFormat('en-PH', {
                                dateStyle: 'short',
                                timeStyle: 'medium'
                            }).format(visit.timeIn)}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className="text-center">
            <h1 className="text-2xl">Completed Visits</h1>
            <table className="">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {completedVisits.map(visit => {
                        return <tr key={visit.id} className="">
                            <td className="p-2">{visit.student.name}</td>
                            <td className="p-2">{new Intl.DateTimeFormat('en-PH', {
                                dateStyle: 'short',
                                timeStyle: 'medium'
                            }).format(visit.timeIn)}</td>
                            {
                                visit.timeOut && <td className="p-2">{new Intl.DateTimeFormat('en-PH', {
                                    dateStyle: 'short',
                                    timeStyle: 'medium'
                                }).format(visit.timeOut)}</td>
                            }
                            <td className="p-2">{visit.duration} min(s)</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </main>
}