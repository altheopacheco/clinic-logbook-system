"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function GradeLevelSelect() {
    const grades = [7, 8, 9, 10, 11, 12];

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("grade")) {
            router.replace("?grade=7");
        }
    }, [searchParams, router]);

    return (
        <Select
            value={searchParams.get("grade") ?? undefined}
            onValueChange={(e) => router.replace(`?grade=${e}`)}
        >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select Grade Level" />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectLabel>Grade Levels</SelectLabel>
                    {grades.map((grade) => (
                        <SelectItem value={grade.toString()} key={grade}>
                            Grade {grade}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default function GradeLevelSelectWrapper() {
    return (
        <Suspense>
            <GradeLevelSelect />
        </Suspense>
    );
}