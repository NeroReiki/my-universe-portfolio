
import Image from "next/image";

// #region PLANET COMPONENT

export default function Planet() {
  return (
    <div
      aria-hidden="true"
      className="planet-float relative w-full max-w-[650px] select-none"
    >
      {/* #region ATMOSPHERIC GLOW */}

      <div className="pointer-events-none absolute inset-[15%] rounded-full bg-indigo-400/20 blur-3xl" />

      {/* #endregion */}

      {/* #region PLANET ARTWORK */}

      <Image
        src="/images/planet-above-clouds.webp"
        alt=""
        width={1254}
        height={1254}
        sizes="(max-width: 1024px) 90vw, 600px"
        loading="eager"
        className="relative h-auto w-full"
        draggable={false}
      />

      {/* #endregion */}
    </div>
  );
}

// #endregion
