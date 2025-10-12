import * as React from "react";
export function Badge({ className="", variant="default", ...props }: any){
  const styles: any = {
    default: "bg-black text-white",
    secondary: "bg-neutral-100 text-neutral-700 border",
    outline: "border text-neutral-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-md ${styles[variant]} ${className}`} {...props}/>;
}
