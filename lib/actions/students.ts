"use server";

import prisma from "../prisma";
import { read, utils } from "xlsx";
import { revalidatePath } from "next/cache";

export async function getStudent(id: number) {
    return await prisma.student.findUnique({
        where: { id }
    });
}

export async function importStudents(formData: FormData) {
    const file = formData.get('records') as File;
    if (!file) return;

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = read(buffer, { type: 'buffer' });

    const allStudents = workbook.SheetNames.flatMap(sheetName => {
        const gradeLevel = parseGradeLevelFromSheet(sheetName);
        if (gradeLevel === null) {
            console.warn(`Skipping sheet "${sheetName}" — not a recognized grade sheet.`);
            return [];
        }

        const rows = utils.sheet_to_json<StudentRow>(workbook.Sheets[sheetName]);
        return rows.map(row => ({
            id: parseInt(String(row["STUDENT NO."]).replaceAll("-", "")),
            name: row.NAME,
            gradeLevel,
        }));
    });

    await Promise.all(
        allStudents.map(student =>
            prisma.student.upsert({
                where: { id: student.id },
                update: {
                    name: student.name,
                    gradeLevel: student.gradeLevel,
                },
                create: student,
            })
        )
    );

    const importedIds = new Set(allStudents.map(s => s.id));
    await prisma.student.updateMany({
        where: {
            NOT: {
                id: { in: Array.from(importedIds) }
            },
            gradeLevel: { lte: 12 } 
        },
        data: {
            gradeLevel: 13
        }
    });

    console.log(`Imported ${allStudents.length} students successfully.`);
    revalidatePath("/students");
}

type StudentRow = {
    "STUDENT NO.": string;
    NAME: string;
};

// Parses "G7" -> 7, "G12" -> 12, anything else -> null
function parseGradeLevelFromSheet(sheetName: string): number | null {
    const match = sheetName.trim().match(/^G(\d+)$/i);
    if (!match) return null;
    const grade = parseInt(match[1]);
    return grade >= 7 && grade <= 12 ? grade : null;
}