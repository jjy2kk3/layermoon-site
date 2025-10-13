"use client";
import * as React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 圆形 LM 徽标 */}
      <div
        className="w-8 h-8 rounded-full bg-black grid place-items-center"
        aria-label="LM"
      >
        <span className="text-white text-[12px] font-black tracking-tight">
          LM
        </span>
      </div>

      {/* 字标 */}
      <div className="leading-none">
        <div className="font-semibold tracking-tight text-[18px]">
          Layer Moon
        </div>
        <div className="text-[12px] text-neutral-500 -mt-0.5">
          Home Staging
        </div>
      </div>
    </div>
  );
}
