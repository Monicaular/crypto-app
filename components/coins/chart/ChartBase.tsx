"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/utils/formatNumber";
import { useAppSelector } from "@/state/hooks";
import { currencySymbols } from "@/utils/currencySymbols";

interface ChartBaseProps<T extends Record<string, unknown>> {
  data: T[];
  type: "area" | "bar";
  color: string;
  dataKey: keyof T;
  gradientId: string;
  title?: string;
  value?: number | null | undefined;
}

export default function ChartBase<T extends Record<string, unknown>>({
  data,
  type,
  color,
  dataKey,
  gradientId,
  title,
  value,
}: ChartBaseProps<T>) {
  const currency = useAppSelector((state) => state.global.currency);
  const symbol = currencySymbols[currency];

  const formattedValue = `${symbol}${formatNumber(value)}`;
  const formattedDate = new Date().toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date().toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative w-full h-64 bg-[#241e38] rounded-xl">
      <div className="absolute top-2 left-4 z-10">
        <p className="text-gray-300 text-sm">{title}</p>
        <h2 className="text-white text-sm font-semibold leading-tight">
          {formattedValue}
        </h2>
        <p className="text-gray-300 text-sm">{formattedDate}</p>
      </div>

      <div className="w-full h-64 bg-[#241e38] rounded-xl p-4">
        <ResponsiveContainer width="100%" height="95%">
          {type === "area" ? (
            <AreaChart data={data}>
              {gradientId && (
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              )}

              <XAxis hide minTickGap={0} dataKey="time" />
              <YAxis
                width={0}
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Tooltip
                formatter={(value) =>
                  `${symbol}${formatNumber(value as number)}`
                }
              />
              <Area
                type="monotone"
                dataKey={dataKey as string}
                stroke={color}
                strokeWidth={2}
                fill={gradientId ? `url(#${gradientId})` : color}
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <XAxis dataKey="time" hide minTickGap={0} />
              <YAxis
                width={0}
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Tooltip
                formatter={(value) =>
                  `${symbol}${formatNumber(value as number)}`
                }
              />
              <Bar dataKey={dataKey as string} fill={color} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="absolute bottom-2 left-4 z-10">
        <p className="text-gray-300 text-xs">
          {formattedDate}, {formattedTime}
        </p>
      </div>
    </div>
  );
}
