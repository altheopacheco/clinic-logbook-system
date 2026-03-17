import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"

interface CardProps {
    title: string,
    content: string,
    Icon: any
}

export default function DashboardCard({title, content, Icon}: CardProps) {
    return <Card className="flex-1 py-4">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center">
            <Icon /> <p className="ml-3">{content}</p>
          </CardTitle>
        </CardHeader>
      </Card>
}