"use server"

import prisma from "../prisma";

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

        return visit;
    }

    const timeOut = new Date();
    const duration = Math.floor(
        (timeOut.getTime() - activeVisit.timeIn.getTime()) / 60000
    );

    const visit = await prisma.visit.update({
        where: { id: activeVisit.id },
        data: { timeOut, duration },
    })

    return visit;
}