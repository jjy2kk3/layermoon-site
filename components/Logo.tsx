"use client";
import * as React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-2 ${className}`}>
      {/* 左侧圆形 LM 徽标 */}
      <div
        className="w-8 h-8 rounded-full bg-black grid place-items-center flex-shrink-0"
        aria-label="LM"
      >
        <span className="text-white text-[12px] font-black tracking-tight">
          LM
        </span>
      </div>

      {/* 右侧文字：Layer Moon + Home Staging */}
      <div className="flex flex-col leading-none">
        <span className="font-semibold text-[18px] tracking-tight">
          Layer Moon
        </span>
        <span className="text-[12px] text-neutral-500 relative -top-0.5 left-[1px]">
          Home&nbsp;Staging
        </span>
      </div>
    </div>
  );
}
