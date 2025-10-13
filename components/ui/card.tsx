export function Card({ className="", ...props }: any){ return <div className={`bg-white border rounded-2xl ${className}`} {...props}/>; }
export function CardHeader({ className="", ...props }: any){ return <div className={`p-4 ${className}`} {...props}/>; }
export function CardTitle({ className="", ...props }: any){ return <h3 className={`text-lg font-semibold ${className}`} {...props}/>; }
export function CardDescription({ className="", ...props }: any){ return <p className={`text-sm text-neutral-600 ${className}`} {...props}/>; }
export function CardContent({ className="", ...props }: any){ return <div className={`p-4 pt-0 ${className}`} {...props}/>; }
export function CardFooter({ className="", ...props }: any){ return <div className={`p-4 pt-0 ${className}`} {...props}/>; }
