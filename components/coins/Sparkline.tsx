"use client";

interface SparklineAreaChartProps {
  prices?: number[];
  baseColor: string;
}

export default function SparklineAreaChart({
  prices,
  baseColor,
}: SparklineAreaChartProps) {
  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    return <span className="text-zinc-600">-</span>;
  }

  const width = 140;
  const height = 48;
  const padding = 2;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const priceRange = max - min === 0 ? 1 : max - min;

  const points = prices.map((price, index) => {
    const x = (index / (prices.length - 1)) * width;
    const y =
      height - padding - ((price - min) / priceRange) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePathData = `M ${points.join(" L ")}`;

  const filledAreaPathData = `
    ${linePathData} 
    L ${width},${height} 
    L 0,${height} 
    Z`;

  const strokeColor = baseColor;
  const solidFillColor = baseColor;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        filter: `drop-shadow(0px 0px 5px ${strokeColor}40)`,
      }}
    >
      {/* Draw the Filled Area */}
      <path
        d={filledAreaPathData}
        fill={solidFillColor}
        stroke="none"
        style={{ pointerEvents: "none" }}
      />

      {/* Draw the Clean Outline Line */}
      <path
        d={linePathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
