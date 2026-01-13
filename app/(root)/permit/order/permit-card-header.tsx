import { PermitOrder } from "@/types";

interface PermitCardHeaderProps {
  order: PermitOrder;
  getStatusStyle: (status: string) => string;
}

export function PermitCardHeader({
  order,
  getStatusStyle,
}: PermitCardHeaderProps) {
  return (
    <div className="relative px-8 py-6 bg-linear-to-br from-slate-800 via-slate-700 to-slate-900">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
            Permit Order
          </p>
          <h2 className="text-white text-3xl font-bold tracking-tight">
            {order.id}
          </h2>
        </div>
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(
            order.status
          )}`}
        >
          {order.status}
        </div>
      </div>

      {/* Permit Type Badge */}
      <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <p className="text-white/70 text-xs font-medium mb-0.5">Type</p>
        <p className="text-white font-semibold text-sm">{order.permitType}</p>
      </div>

      {/* Decorative circle for tear-off effect */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-50 rounded-full shadow-inner" />
    </div>
  );
}
