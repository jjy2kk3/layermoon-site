import * as React from "react";
export function Select({ value, onValueChange, children }: any){ return <div data-value={value}>{children}</div>; }
export function SelectTrigger({ children }: any){ return <div className="border rounded-lg px-3 py-2 text-sm bg-white">{children}</div>; }
export function SelectValue({ placeholder }: any){ return <span>{placeholder}</span>; }
export function SelectContent({ children }: any){ return <div className="mt-2 border rounded-lg bg-white p-2">{children}</div>; }
export function SelectItem({ value, children, onClick }: any){ return <div className="px-2 py-1 cursor-pointer hover:bg-neutral-100 rounded" onClick={onClick}>{children}</div>; }
