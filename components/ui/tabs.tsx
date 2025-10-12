import * as React from "react";
export function Tabs({ defaultValue, children }: any){ return <div>{children}</div>; }
export function TabsList({ className="", children }: any){ return <div className={`flex gap-2 ${className}`}>{children}</div>; }
export function TabsTrigger({ value, children }: any){ return <button className="px-3 py-1 border rounded-lg text-sm">{children}</button>; }
export function TabsContent({ value, children, className="" }: any){ return <div className={className}>{children}</div>; }
