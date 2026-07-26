"use client";

import { useAppSelector } from "@/state/hooks";
import { currencySymbols } from "@/utils/currencySymbols";
import { formatNumber } from "@/utils/formatNumber";

type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
};

export default function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  const currency = useAppSelector((state) => state.global.currency);
  const symbol = currencySymbols[currency] || "";

  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[#181424] border border-zinc-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md min-w-35 select-none">
      {label && (
        <p className="text-xs font-medium text-zinc-400 mb-2 border-b border-zinc-800 pb-1">
          {String(label)}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-semibold text-zinc-300 uppercase">
                {String(entry.name || "")}
              </span>
            </div>

            <div>
              <span className="font-bold text-white tracking-tight">
                {symbol}
                {formatNumber(Number(entry.value) || 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
