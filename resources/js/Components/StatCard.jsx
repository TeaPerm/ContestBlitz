import { Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

export default function StatCard({cardTitle,cardCount,cardContent, IconComponent}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cardCount}</div>
        <p className="text-xs text-muted-foreground">{cardContent}</p>
      </CardContent>
    </Card>
  )
}
