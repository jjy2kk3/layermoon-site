
'use client';
export default function Logo({ className='' }: { className?: string }){
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" role="img" aria-label="LM">
        <rect x="0" y="0" width="36" height="36" rx="10" fill="#111"/>
        <path d="M10 24V12h2.6v9.2H22V24H10Z" fill="#fff"/>
        <path d="M24 12v12h-2.6V12H24Z" fill="#fff"/>
      </svg>
      <div className="leading-none">
        <div className="font-semibold tracking-tight text-[18px]">Layer Moon</div>
        <div className="text-[12px] text-neutral-500 tracking-wide -mt-0.5">Home Staging</div>
      </div>
    </div>
  );
}
