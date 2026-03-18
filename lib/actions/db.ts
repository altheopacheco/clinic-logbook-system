"use server"

import fs from "fs";
import path from "path";

export async function backupDatabase() {
    const dbPath = path.resolve(process.env.DATABASE_URL!.replace("file:", ""));
    const backupDir = path.resolve("backups");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `backup-${timestamp}.db`);

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.copyFileSync(dbPath, backupPath);
    console.log(`Database backed up to ${backupPath}`);

    return backupPath;
}