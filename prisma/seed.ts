import prisma from '@/lib/prisma';
import {parse} from 'csv-parse/sync'
import * as fs from 'fs';

const FILES = [
    { file: 'G9.csv', grade: 9 },
    { file: 'G8.csv', grade: 8 },
    { file: 'G10.csv', grade: 10 },
    { file: 'G11.csv', grade: 11 },
    { file: 'G12.csv', grade: 12 },
    { file: 'G7.csv', grade: 7 },
];

interface StudentRow {
  'STUDENT NO.': string
  NAME: string
}


async function main() {
    for (const {file, grade} of FILES) {
        const records = parse(fs.readFileSync("data/" + file, 'utf-8'), {
            columns: true,
            skip_empty_lines: true
        }) as StudentRow[];

        console.log(`Importing ${records.length} students from ${file}...`)

        for (const row of records) {
            await prisma.student.upsert({
                where: { id: Number.parseInt(row['STUDENT NO.']) }, // or whatever your unique field is
                update: {},
                create: {
                    name: row.NAME,
                    id: Number.parseInt(row['STUDENT NO.']),
                },
            });
        }

        console.log(`Done with grade ${grade}`)
    }
}

main().then(()=> {console.log("DONE!")});