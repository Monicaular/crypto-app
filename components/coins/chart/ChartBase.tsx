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
  CartesianGrid,
} from "recharts";
import { formatNumber } from "@/utils/formatNumber";
import { useAppSelector } from "@/state/hooks";
import { currencySymbols } from "@/utils/currencySymbols";

interface ChartBaseProps<T extends Record<string, unknown>> {
  data: T[];
  type: "area" | "bar" | "line";
  color: string;
  dataKey: string;
  secondaryDataKey?: string;
  secondaryColor?: string;
  gradientId: string;
  title?: string;
  value?: number | null | undefined;
  isCompareMode?: boolean;
}

export default function ChartBase<T extends Record<string, unknown>>({
  data,
  type,
  color,
  dataKey,
  secondaryDataKey,
  secondaryColor = "#fbbf24",
  gradientId,
  title,
  value,
  isCompareMode = false,
}: ChartBaseProps<T>) {
  const currency = useAppSelector((state) => state.global.currency);
  const symbol = currencySymbols[currency] || "";

  const formattedValue =
    value !== undefined && value !== null
      ? `${symbol}${formatNumber(value)}`
      : "";

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
    <div className="relative w-full h-72 bg-[#241e38] border border-zinc 800/80 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-xl">
      {/**Header Info & Dynamic Legend */}
      <div className="flex justify-between items-start z-10 px-1 pt-1">
        <div>
          <p className="text-white text-sm font-medium tracking-wider">
            {title}
          </p>
          {formattedValue && (
            <h2 className="text-white text-xl font-semibold leading-snug tracking-tight">
              {formattedValue}
            </h2>
          )}
          <p className="text-gray-300 text-sm">{formattedDate}</p>
        </div>
        {/**Comparison Legend Badges */}
        {isCompareMode && (
          <div className="flex items-center gap-3 bg-[#1a1528] px-3 py-1.5 rounded-lg border border-zinc-800/60 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: color,
                }}
              ></span>
              <span className="uppercase">{dataKey}</span>
            </div>
            {secondaryDataKey && (
              <div className="flex items-center gap-1.5 text-zinc-300">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: secondaryColor,
                  }}
                />
                <span className="uppercase">{secondaryDataKey}</span>
              </div>
            )}
          </div>
        )}
      </div>
      {/**Chart Canvas */}
      <div className="w-full h-48 mt-2">
        <ResponsiveContainer width="100%" height="95%">
          {type === "area" ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={color}
                    stopOpacity={isCompareMode ? 0.25 : 0.4}
                  />
                  <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
                {secondaryDataKey && (
                  <linearGradient
                    id={`${gradientId}-secondary`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={secondaryColor}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor={secondaryColor}
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                )}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#332a4e"
                vertical={false}
              />
              <XAxis hide minTickGap={0} dataKey="time" />
              {/* Primary Y-Axis*/}
              <YAxis
                yAxisId="left"
                width={0}
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              {/**Secondary Y-Axis */}
              {isCompareMode && (
                <YAxis
                  yAxisId="right"
                  width={0}
                  orientation="right"
                  domain={["auto", "auto"]}
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#181424",
                  borderColor: "#3f3f46",
                  borderRadius: "10px",
                  color: "#f4f4f5",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                }}
                formatter={(value, name) => [
                  `${symbol}${formatNumber(Number(value) || 0)}`,
                  String(name).toUpperCase(),
                ]}
              />
              {/**Primary Area Series*/}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
              />
              {/**Secondary Area (Compare Mode) */}
              {isCompareMode && secondaryDataKey && (
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey={secondaryDataKey}
                  stroke={secondaryColor}
                  strokeWidth={2}
                  fill={`url(#${gradientId}-secondary)`}
                />
              )}
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#332a4e"
                vertical={false}
              />
              <XAxis dataKey="time" hide minTickGap={0} />

              {/**Dual Y-Axis for Volume Bars */}
              <YAxis
                yAxisId="left"
                width={0}
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              {isCompareMode && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  width={0}
                  domain={["auto", "auto"]}
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#181424",
                  borderColor: "#3f3f46",
                  borderRadius: "8px",
                  color: "#f4f4f5",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                }}
                formatter={(value, name) => [
                  `${symbol}${formatNumber(Number(value) || 0)}`,
                  String(name).toUpperCase(),
                ]}
              />

              <Bar
                yAxisId="left"
                dataKey={dataKey}
                fill={color}
                radius={[4, 4, 0, 0]}
              />
              {isCompareMode && secondaryDataKey && (
                <Bar
                  yAxisId="right"
                  dataKey={secondaryDataKey}
                  fill={secondaryColor}
                  radius={[4, 4, 0, 0]}
                />
              )}
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
