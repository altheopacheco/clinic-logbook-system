"use server";

import { error } from "console";
import prisma from "../prisma";
import {read, readFile, utils, WorkBook, WorkSheet} from "xlsx";
import { revalidatePath } from "next/cache";
import { Student } from "@/generated/prisma/browser";
import toast from "react-hot-toast";

export async function getStudent(id: number) {
    return await prisma.student.findUnique({
        where: {id}
    })
}

export async function importStudents(formData: FormData) {
    const file = formData.get('records') as File;
    if(!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = read(buffer, { type: 'buffer' });

    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const rows = utils.sheet_to_json<StudentRow>(sheet);

        const normalized = rows.map(row => ({
            ...row,
            "STUDENT NO.": String(row["STUDENT NO."]).replaceAll("-", "")
        }));

        workbook.Sheets[sheetName] = utils.json_to_sheet(normalized);
    });

    const g7GradYear = parseInt(getG7GradYear(workbook));

    const allStudents = workbook.SheetNames.flatMap(sheetName => {
        const rows = utils.sheet_to_json<StudentRow>(workbook.Sheets[sheetName]);
        return rows.map(row => {
            const studentGradYear = parseInt(getGradYear(String(row["STUDENT NO."])));
            const gradeLevel = 7 + (g7GradYear - studentGradYear);
            return {
                id: parseInt(row["STUDENT NO."]),
                name: row.NAME,
                gradeLevel: gradeLevel,
            };
        });
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

    console.log(`Imported ${allStudents.length} students successfully.`);
    revalidatePath("/students");
}

type StudentRow = {
    "STUDENT NO.": string,
    NAME: string
}

function getG7GradYear(workbook: WorkBook) {
    let max = 0;
    const sheetNames = workbook.SheetNames;
    const sheets = workbook.Sheets;
    for(const name in sheets) {
        const data = utils.sheet_to_json(sheets[name]) as StudentRow[];
        data.forEach(student => {
            const id = parseInt(student["STUDENT NO."]);
            if (id > max) {
                max = id;
            } 
        })
    }

    return String(max).slice(1, 5);
}

function getGradYear(id: string) {
    const padding = id.length - 8;
    return id.slice(padding + 1, padding + 5);
}

export async function deleteAllStudents() {
    const {count} = await prisma.student.deleteMany({});
    if(count) {
        console.log("Succesfully deleted all student rows.");
    } 

    revalidatePath("/students");
}