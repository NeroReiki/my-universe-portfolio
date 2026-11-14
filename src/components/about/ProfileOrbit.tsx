import Image from "next/image";

// #region PROFILE ORBIT COMPONENT

export default function ProfileOrbit() {
  return (
    <div className="group relative isolate mx-auto h-32 w-32 shrink-0 sm:h-40 sm:w-40 lg:mx-0">

      {/* #region BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full bg-cyan-400/25 blur-3xl motion-safe:animate-pulse"
      />
      {/* #endregion */}

      {/* #region OUTER ROTATING ORBIT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-full border border-dashed border-violet-300/50 motion-safe:animate-[spin_28s_linear_infinite]"
      />
      {/* #endregion */}

      {/* #region INNER ROTATING ORBIT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-full border-2 border-transparent border-t-cyan-300 border-b-violet-400 motion-safe:animate-[spin_18s_linear_infinite]"
      >
        {/* ORBITING STAR */}
        <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_15px_5px_rgba(103,232,249,0.5)]" />
      </div>
      {/* #endregion */}

      {/* #region PROFILE IMAGE */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-[3px] border-cyan-200/80 bg-[#0B1730] shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_45px_rgba(34,211,238,0.7)] motion-reduce:transition-none">

        <Image
          src="/images/daniel-profile.webp"
          alt="Daniel's profile portrait"
          fill
          sizes="(max-width: 640px) 128px, 160px"
          priority
          className="object-cover"
        />

      </div>
      {/* #endregion */}

    </div>
  );
}

// #endregion
