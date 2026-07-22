"use client";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setCompareMode } from "@/store/chartSlice";

export default function CompareToggleSwitch() {
  const dispatch = useAppDispatch();
  const isCompareMode = useAppSelector((state) => state.chart.isCompareMode);

  return (
    <div className="flex items-end gap-3 bg-[#241e38] px-3.5 py-2 rounded-xl border border-zinc-800">
      <span className="text-sm font-medium text-zinc-300 select-none">
        Compare
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isCompareMode}
        onClick={() => dispatch(setCompareMode(!isCompareMode))}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          isCompareMode ? "bg-primary" : "bg-zinc-700"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            isCompareMode ? "translate-x-6" : "translate-x-1"
          }`}
        ></span>
      </button>
    </div>
  );
}
