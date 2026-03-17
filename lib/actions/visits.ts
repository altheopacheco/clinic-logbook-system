"use server"

import { Prisma } from "@/generated/prisma/client";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function createVisit(studentID: string) {
    const id = parseInt(studentID);
    const student = await prisma.student.findUnique({
        where: {id}
    });

    if (!student) {
        return  {error: `Student ${id} could not be found.`}
    }

    const activeVisit = await prisma.visit.findFirst({
        where: {
            studentId: id,
            timeOut: null,
        }
    })

    if (!activeVisit) {
        const visit = await prisma.visit.create({
            data: {
                studentId: id,
                timeIn: new Date()
            }
        });

        return { ...visit, studentName: student.name, type: "in" };
    }

    const timeOut = new Date();

    const visit = await prisma.visit.update({
        where: { id: activeVisit.id },
        data: { timeOut },
    });

    return { ...visit, studentName: student.name, type: "out" };
}

export async function clearVisits(visits: Prisma.VisitGetPayload<{
    include: { student: true }
}>[]) {
    await prisma.visit.updateMany({
        where: {
            id: { in: visits.map(v => v.id) }
        },
        data: {
            timeOut: new Date()
        }
    });

    revalidatePath("/dashboard");
}