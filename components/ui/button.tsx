import * as React from "react";
export function Button({ className="", variant="default", size="md", ...props }: any) {
  const base = "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm border";
  const variants: any = {
    default: "bg-black text-white border-black hover:opacity-90",
    outline: "bg-white text-black border-neutral-300 hover:bg-neutral-100",
    ghost: "bg-transparent border-transparent hover:bg-neutral-100",
  };
  const sizes: any = { sm: "px-2 py-1 text-sm", md: "px-3 py-2", lg: "px-4 py-2.5" };
  return <button className={`${base} ${variants[variant]} ${sizes[size]||""} ${className}`} {...props} />;
}
export default Button;
