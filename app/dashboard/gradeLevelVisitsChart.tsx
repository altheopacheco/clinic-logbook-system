"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Pie, PieChart } from "recharts"

type Props = {
    data: {
        gradeLevel: number,
        visits: number
    }[]
}


const chartConfig = {
    "visits": {
        label: "Visits"
    },
    "12": {
        label: "Grade 12",
        color: "var(--chart-1)",
    },
    "11": {
        label: "Grade 11",
        color: "var(--chart-2)",
    },
    "10": {
        label: "Grade 10",
        color: "var(--chart-3)",
    },
    "9": {
        label: "Grade 9",
        color: "var(--chart-4)",
    },
    "8": {
        label: "Grade 8",
        color: "var(--chart-5)",
    },
    "7": {
        label: "Grade 7",
        color: "var(--chart-6)",
    }
} satisfies ChartConfig

const fills = [
    {fill: "var(--chart-1)"},
    {fill: "var(--chart-2)"},
    {fill: "var(--chart-3)"},
    {fill: "var(--chart-4)"},
    {fill: "var(--chart-5)"},
    {fill: "var(--chart-6)"},
]

export const GradeLevelVisitsChart = ({data} : Props) => {

    // const maxVisit = Math.max(...data.map(o => Number(o.visits)));
    // const maxGrade = data.find(d => Number(d.visits) == maxVisit)?.gradeLevel;

    const chartData = data.map((v, i) => ({...v, ...fills[i]}));
  return (
    <Card className="md:row-span-2 py-4 gap-0 w-full hidden lg:block md:col-span-1 h-full">
        <CardHeader>
            <CardTitle className="text-xl">Clinic Visits - Today</CardTitle>
            <CardDescription>By Grade Level</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[40vh]" 
            >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                    />
                    <Pie data={chartData} dataKey="visits" nameKey="gradeLevel" />
                </PieChart>
            </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
            Grade {maxGrade} are the Top Visitors<Users className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
            Showing number of visits per grade level
            </div>
        </CardFooter> */}
    </Card>
  )
}
