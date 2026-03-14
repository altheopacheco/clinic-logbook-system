"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GradeLevelTabs() {
    const grades = [7, 8, 9, 10, 11, 12];

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if(!searchParams.get("grade")) {
            router.replace("?grade=7");
        }
    }, [searchParams]);

    return <Tabs value={searchParams.get("grade")?.toString()}>
                <TabsList>
                    { grades.map(grade => {
                        return <TabsTrigger 
                            value={grade.toString()} key={grade}
                            onClick={() => {
                                router.replace(`?grade=${grade}`);
                            }}

                            >Grade {grade}</TabsTrigger>
                        }) 
                    }
                    
                </TabsList>
            </Tabs>
}