"use client";
import React from "react";

const NAVY = "#0f2d5e";

// 3 equal buckets (33% each): Low / Medium / High
const BUCKETS = [
  { name: "Low", color: "#ef4444" },
  { name: "Medium", color: "#f59e0b" },
  { name: "High", color: "#16a34a" },
];

export function bucketOf(value: number): "Low" | "Medium" | "High" {
  const v = Math.max(0, Math.min(100, value));
  if (v < 33.34) return "Low";
  if (v < 66.67) return "Medium";
  return "High";
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
}

// Arc path from startAngle to endAngle (degrees, measured CCW from +x axis), drawn clockwise (sweep=1)
function arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const s = polar(cx, cy, r, startAngle);
  const e = polar(cx, cy, r, endAngle);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`;
}

/**
 * Semicircular speedometer/meter with 3 equal Low/Medium/High buckets.
 * `value` is a 0–100 normalised score.
 */
export default function Speedometer({
  label,
  value,
  display,
}: {
  label: string;
  value: number | null;
  display?: string;
}) {
  const W = 200;
  const H = 128;
  const cx = W / 2;
  const cy = 118;
  const R = 84;
  const stroke = 18;

  const has = value !== null && !Number.isNaN(value);
  const v = has ? Math.max(0, Math.min(100, value as number)) : 0;
  const needleAngle = 180 - (v / 100) * 180; // 0 -> 180deg (left), 100 -> 0deg (right)
  const needle = polar(cx, cy, R - 6, needleAngle);
  const bkt = has ? bucketOf(v) : null;
  const bktColor = bkt ? BUCKETS.find((b) => b.name === bkt)!.color : "#cbd5e1";

  // 3 equal arcs across the 180° sweep (180→120→60→0)
  const segs = [
    { from: 180, to: 120, color: BUCKETS[0].color },
    { from: 120, to: 60, color: BUCKETS[1].color },
    { from: 60, to: 0, color: BUCKETS[2].color },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 200 }}>
        {segs.map((s) => (
          <path
            key={s.from}
            d={arc(cx, cy, R, s.from, s.to)}
            fill="none"
            stroke={has ? s.color : "#e2e8f0"}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        ))}
        {/* needle */}
        {has && (
          <>
            <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={NAVY} strokeWidth={4} strokeLinecap="round" />
            <circle cx={cx} cy={cy} r={7} fill={NAVY} />
          </>
        )}
        {/* bucket tick labels */}
        <text x={polar(cx, cy, R + 14, 160).x} y={polar(cx, cy, R + 14, 160).y} fontSize="9" fill="#94a3b8" textAnchor="middle">Low</text>
        <text x={cx} y={cy - R - 12} fontSize="9" fill="#94a3b8" textAnchor="middle">Med</text>
        <text x={polar(cx, cy, R + 14, 20).x} y={polar(cx, cy, R + 14, 20).y} fontSize="9" fill="#94a3b8" textAnchor="middle">High</text>
      </svg>
      <div style={{ marginTop: 2 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{label}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{ background: bktColor, color: "#fff", padding: "2px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
            {bkt || "—"}
          </span>
          {display && <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{display}</span>}
        </div>
      </div>
    </div>
  );
}
