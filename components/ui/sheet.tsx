import * as React from "react";
export function Sheet({ children }: any){ return <div>{children}</div>; }
export function SheetTrigger({ asChild=false, children }: any){ return asChild? children: <button>{children}</button>; }
export function SheetContent({ className="", children }: any){
  // Very minimal off-canvas imitation
  return <div className={`fixed right-0 top-0 h-full w-full sm:max-w-md bg-white border-l p-4 overflow-auto z-50 ${className}`}>{children}</div>;
}
export function SheetHeader({ children }: any){ return <div className="mb-2">{children}</div>; }
export function SheetTitle({ children }: any){ return <h3 className="text-lg font-semibold">{children}</h3>; }
