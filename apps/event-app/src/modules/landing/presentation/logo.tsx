export const Logo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 28 28">
        <rect
          x="2"
          y="2"
          width="24"
          height="24"
          rx="4"
          fill="var(--color-bg-inverse)"
        />
        <text
          x="14"
          y="19"
          textAnchor="middle"
          fontFamily="Instrument Serif"
          fontSize="18"
          fill="var(--color-text-inverse)"
          fontStyle="italic"
        >
          A
        </text>
      </svg>
      <span className="font-serif text-2xl italic tracking-tight">Afisz</span>
      <span className="opacity-50">·</span>
      <span className="font-mono text-[11px] tracking-widest opacity-55 uppercase pt-1.5">
        pl
      </span>
    </div>
  );
};
