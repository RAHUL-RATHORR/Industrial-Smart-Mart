import { cn } from "@/lib/utils";

type AdminFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function AdminField({ label, children, className }: AdminFieldProps) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export const adminInputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#f4b400] focus:ring-2 focus:ring-[#f4b400]/30";

export const adminCardClass = "rounded-xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm";
