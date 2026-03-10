"use server";

import prisma from "../prisma";

export async function getStudent(id: number) {
    return await prisma.student.findUnique({
        where: {id}
    })
}