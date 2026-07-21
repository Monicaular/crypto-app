"use client";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { setRange, fetchChartData } from "@/store/chartSlice";
import { chartRanges } from "@/utils/chartRanges";

export default function RangeSelector() {
  const dispatch = useAppDispatch();
  const { range, coinId } = useAppSelector((state) => state.chart);
  const currency = useAppSelector((state) => state.global.currency);

  const handleChange = (newRange: string) => {
    dispatch(setRange(newRange));
    dispatch(fetchChartData({ coinId, range: newRange, currency }));
  };

  return (
    <div className="bg-[#241e38] flex p-1 border border-zinc-800/80 rounded-xl w-fit m-3">
      {chartRanges.map((r) => {
        const isActive = range === r.value;
        return (
          <button
            key={r.value}
            onClick={() => handleChange(r.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 select-none ${
              isActive
                ? "bg-purple-600 text-white scale-[1.02]"
                : "bg-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
