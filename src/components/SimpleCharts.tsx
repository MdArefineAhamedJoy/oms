import React from "react";

// Minimal, dependency-free SVG charts for placeholder visualization.

export function AreaChart({ data, height = 160, className = "" }: { data: number[]; height?: number; className?: string }) {
  const width = 480;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pad = 12;
  const step = (width - pad * 2) / (data.length - 1 || 1);
  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (1 - (v - min) / (max - min || 1)) * (height - pad * 2);
    return [x, y];
  });
  const d = [
    `M ${points[0]?.[0] ?? pad} ${height - pad}`,
    `L ${points[0]?.[0] ?? pad} ${points[0]?.[1] ?? height / 2}`,
    ...points.slice(1).map(([x, y]) => `L ${x} ${y}`),
    `L ${points.at(-1)?.[0] ?? width - pad} ${height - pad}`,
    "Z",
  ].join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${className}`}>
      <defs>
        <linearGradient id="areaIndigo" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <path d={d} fill="url(#areaIndigo)" stroke="none" />
      <polyline
        fill="none"
        stroke="#6366f1"
        strokeWidth="2"
        points={points.map(([x, y]) => `${x},${y}`).join(" ")}
      />
    </svg>
  );
}

export function DonutChart({ data, size = 160, className = "" }: { data: { label: string; value: number; color?: string }[]; size?: number; className?: string }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 10;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  const arcs = data.map((d, i) => {
    const start = acc / total * Math.PI * 2;
    acc += d.value;
    const end = acc / total * Math.PI * 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    return (
      <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={d.color || "#6366f1"} opacity={0.9} />
    );
  });

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${cx} ${cy})`}>{arcs}</g>
        <circle cx={cx} cy={cy} r={r * 0.6} fill="white" />
      </svg>
      <div className="text-sm">
        {data.map((d, i) => (
          <div key={i} className="mb-1 flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="inline-block h-2 w-2 rounded" style={{ background: d.color || "#6366f1" }} />
            {d.label} <span className="text-zinc-500">({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ data, height = 180, className = "" }: { data: { label: string; value: number }[]; height?: number; className?: string }) {
  const width = 480;
  const pad = 16;
  const max = Math.max(...data.map(d => d.value));
  const barW = (width - pad * 2) / (data.length * 1.6);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${className}`}>
      {data.map((d, i) => {
        const x = pad + i * barW * 1.6;
        const h = (d.value / max) * (height - 40);
        const y = height - 20 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={4} className="fill-indigo-500/80" />
            <text x={x + barW / 2} y={height - 6} textAnchor="middle" className="fill-zinc-500 text-[10px]">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function ProgressList({ items }: { items: { label: string; percent: number; color?: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">{it.label}</span>
            <span className="text-zinc-500">{it.percent}%</span>
          </div>
          <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800">
            <div className="h-2 rounded" style={{ width: `${it.percent}%`, background: it.color || "#6366f1" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

