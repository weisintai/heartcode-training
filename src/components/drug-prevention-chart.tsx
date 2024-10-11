"use client";

import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { questions } from "@/lib/constants";

export const description = "A pie chart with a label";

function getChartColor(index: number): string {
  return `hsl(var(--chart-${index + 1}))`;
}

export function DrugPreventionChart({
  surveyResults,
}: {
  surveyResults: {
    id: number;
    educationHours: number;
    peerPressureConfidence: number;
    trustedAdults: number;
    campaignMessages: number;
    drugFreeActivities: number;
    createdAt: Date;
  }[];
}) {
  const columns = [
    "educationHours",
    "peerPressureConfidence",
    "trustedAdults",
    "campaignMessages",
    "drugFreeActivities",
  ];

  const chartData: Record<
    string,
    {
      data: Array<{ type: string; count: number; fill: string }>;
      chartConfig: Record<string, { label: string; color: string }>;
    }
  > = {};

  columns.forEach((column) => {
    const questionConfig = questions.find((q) => q.name === column);
    if (!questionConfig) return;

    const columnData = Object.entries(
      surveyResults.reduce((acc: Record<string, number>, result: any) => {
        const value = result[column];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {})
    );

    const data = columnData.map(([type, count], index) => ({
      type,
      count,
      fill: getChartColor(index),
    }));

    const chartConfig: Record<string, { label: string; color: string }> = {
      count: { label: "Count", color: getChartColor(0) },
    };

    questionConfig.options.forEach((option, index) => {
      chartConfig[option.value] = {
        label: option.label,
        color: getChartColor(index),
      };
    });

    chartData[column] = {
      data,
      chartConfig,
    };
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(chartData).map((column) => {
        const { data, chartConfig } = chartData[column];

        return (
          <Card className="flex flex-col" key={column}>
            <CardHeader className="items-center pb-0">
              <CardTitle>
                {questions.find((q) => q.name === column)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={data} dataKey="count" label nameKey="type">
                    <LabelList
                      dataKey="type"
                      className="fill-background"
                      stroke="none"
                      fontSize={12}
                      formatter={(value: keyof typeof chartConfig) =>
                        chartConfig[value]?.label
                      }
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="leading-none text-muted-foreground text-center">
                {questions.find((q) => q.name === column)?.text}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
