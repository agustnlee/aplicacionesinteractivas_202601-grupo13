import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 rounded-lg outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${className}`}
      aria-label="Ir al inicio — CrediGest"
    >
      <div className="rounded-lg bg-blue-600 p-2 shadow-sm ring-1 ring-blue-700/20">
        <Landmark className="size-6 text-white" aria-hidden />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-800">
        CrediGest
      </span>
    </Link>
  );
}
