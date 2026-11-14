
const stars = Array.from({ length: 80 }, (_, index) => {
  // Deterministic positions keep server and client rendering consistent.
  const random = (seed: number) => {
    const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  return {
    id: index,
    left: random(index * 3 + 1) * 100,
    top: random(index * 3 + 2) * 100,
    size: 1 + random(index * 3 + 3) * 2,
    delay: random(index + 100) * 5,
    duration: 2 + random(index + 200) * 4,
  };
});

export default function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
