import prisma from "@/lib/prisma"

export default async function Page() {
    const students = await prisma.student.findMany();
    return <div>{students.map((student) => student.name)}</div>
}