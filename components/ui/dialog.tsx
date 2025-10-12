import * as React from "react";
export function Dialog({ open=false, onOpenChange, children }: any){ return open? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">{children}</div> : null; }
export function DialogTrigger({ asChild=false, children }: any){ return asChild? children: <button>{children}</button>; }
export function DialogContent({ className="", children }: any){ return <div className={`bg-white rounded-xl p-4 w-full max-w-lg ${className}`}>{children}</div>; }
export function DialogHeader({ children }: any){ return <div className="mb-2">{children}</div>; }
export function DialogTitle({ children }: any){ return <h3 className="text-lg font-semibold">{children}</h3>; }
export function DialogDescription({ children }: any){ return <p className="text-sm text-neutral-600">{children}</p>; }
export function DialogFooter({ children }: any){ return <div className="mt-3 flex justify-end gap-2">{children}</div>; }
