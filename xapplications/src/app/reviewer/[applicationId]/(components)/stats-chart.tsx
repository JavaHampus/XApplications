"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

interface StatsChartProps {
    pending: number
    accepted: number
    denied: number
    total: number
}

export function StatsChart({ pending, accepted, denied, total }: StatsChartProps) {
    const chartData = [
        { status: "Pending", amount: pending },
        { status: "Accepted", amount: accepted },
        { status: "Denied", amount: denied },
        { status: "Total", amount: total },
      ]

  return (
    <ChartContainer config={chartConfig}>
    <BarChart
      accessibilityLayer
      data={chartData}
      margin={{
        top: 20,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="status"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={value => value}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
        <LabelList
          position="top"
          offset={12}
          className="fill-foreground"
          fontSize={12}
        />
      </Bar>
    </BarChart>
  </ChartContainer>
  )
}
