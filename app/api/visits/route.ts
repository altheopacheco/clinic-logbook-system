import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return new Response("visits", {
    status: 200
  });
}

export async function POST(req: Request) {
  try {
    
    const { studentNumber, staffId } = await req.json()

    if (!studentNumber || !staffId) {
      console.log(1);
      return Response.json({ error: "Invalid request" }, { status: 400 })
    }

    const student = await prisma.student.findUnique({
      where: { studentNumber },
    })

    if (!student) {
      console.log(2);
      return Response.json({ error: "Student not found" }, { status: 404 })
    }

    const activeVisit = await prisma.visit.findFirst({
      where: {
        studentId: student.studentNumber,
        timeOut: null,
      },
    })

    if (!activeVisit) {
      const visit = await prisma.visit.create({
        data: {
          studentId: student.studentNumber,
          staffId,
          timeIn: new Date(),
        },
      })

      return Response.json({
        status: "started",
        visitId: visit.id,
      })
    }

    const timeOut = new Date()
    const duration = Math.floor(
      (timeOut.getTime() - activeVisit.timeIn.getTime()) / 60000
    )

    await prisma.visit.update({
      where: { id: activeVisit.id },
      data: { timeOut },
    })

    return Response.json({
      status: "ended",
      duration,
    })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unexpected error'
    return new Response(message, {status: 500})
  }
}