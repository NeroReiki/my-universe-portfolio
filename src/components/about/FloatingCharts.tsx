
"use client";

// #region FLOATING CHARTS COMPONENT

export default function FloatingCharts() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[280px] w-full max-w-[520px] sm:h-[340px]"
    >
      {/* #region ANIMATION STYLES */}
      <style>{`
        @keyframes aboutFloatOne {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes aboutFloatTwo {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @keyframes aboutFloatThree {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @media (prefers-reduced-motion: no-preference) {
          .about-chart-main {
            animation: aboutFloatOne 7s ease-in-out infinite;
          }

          .about-chart-small {
            animation: aboutFloatTwo 5.5s ease-in-out infinite;
          }

          .about-chart-circle {
            animation: aboutFloatThree 6s ease-in-out infinite;
          }
        }
      `}</style>
      {/* #endregion */}

      {/* #region BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-10 rounded-full bg-cyan-400/15 blur-[75px]" />
      {/* #endregion */}

      {/* #region MAIN LINE AND BAR CHART */}
      <div className="about-chart-main absolute left-0 top-8 w-[78%] rounded-2xl border border-cyan-300/40 bg-[#09172F]/60 p-4 shadow-[0_0_40px_rgba(34,211,238,0.16)] backdrop-blur-xl sm:p-6">

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Data Insights
          </span>

          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
        </div>

        <svg
          viewBox="0 0 340 160"
          className="h-auto w-full"
          fill="none"
        >
          {/* CHART GRID */}
          {[30, 70, 110, 150].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="340"
              y2={y}
              stroke="#64748b"
              strokeOpacity="0.2"
            />
          ))}

          {/* CHART BARS */}
          {[
            { x: 20, h: 40 },
            { x: 65, h: 65 },
            { x: 110, h: 52 },
            { x: 155, h: 83 },
            { x: 200, h: 70 },
            { x: 245, h: 100 },
            { x: 290, h: 118 },
          ].map((bar, index) => (
            <rect
              key={index}
              x={bar.x}
              y={150 - bar.h}
              width="23"
              height={bar.h}
              rx="3"
              fill={index % 2 === 0 ? "#22d3ee" : "#a78bfa"}
              opacity="0.65"
            />
          ))}

          {/* TREND LINE */}
          <polyline
            points="31,118 76,96 121,105 166,65 211,78 256,40 301,23"
            stroke="#67e8f9"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* TREND POINTS */}
          {[
            [31, 118],
            [76, 96],
            [121, 105],
            [166, 65],
            [211, 78],
            [256, 40],
            [301, 23],
          ].map(([x, y], index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#67e8f9"
            />
          ))}
        </svg>

        <p className="mt-2 text-xs text-slate-400">
          Exploring patterns through data
        </p>
      </div>
      {/* #endregion */}

      {/* #region SMALL BAR CHART */}
      <div className="about-chart-small absolute right-0 top-0 w-[42%] rounded-2xl border border-violet-300/40 bg-[#111632]/65 p-4 shadow-[0_0_30px_rgba(167,139,250,0.18)] backdrop-blur-xl">

        <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-violet-200">
          Visualization
        </p>

        <div className="flex h-16 items-end justify-between gap-2">
          {[35, 55, 42, 75, 60, 90].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500 to-violet-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      {/* #endregion */}

      {/* #region CIRCULAR ANALYTICS CARD */}
      <div className="about-chart-circle absolute bottom-0 right-[4%] flex w-[58%] items-center gap-4 rounded-2xl border border-cyan-300/50 bg-[#102344]/65 p-4 shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-xl">

        {/* DONUT CHART */}
        <div
          className="relative h-16 w-16 shrink-0 rounded-full sm:h-20 sm:w-20"
          style={{
            background:
              "conic-gradient(#22d3ee 0% 45%, #a78bfa 45% 78%, #334155 78% 100%)",
          }}
        >
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-[#102344]">
            <span className="text-[9px] font-semibold text-cyan-200">
              DATA
            </span>
          </div>
        </div>

        {/* DONUT LABELS */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
            <span className="truncate text-xs text-slate-200">
              Analyze
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-violet-400" />
            <span className="truncate text-xs text-slate-200">
              Visualize
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-slate-500" />
            <span className="truncate text-xs text-slate-200">
              Discover
            </span>
          </div>
        </div>
      </div>
      {/* #endregion */}

    </div>
  );
}

// #endregion
