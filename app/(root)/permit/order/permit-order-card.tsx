import Link from "next/link";
import { PermitOrder } from "@/types";
import { getStatusStyle, formatDate } from "@/lib/utils";
import { PermitCardHeader } from "./permit-card-header";
import { PermitCardContent } from "./permit-card-content";

interface PermitOrderCardProps {
  order: PermitOrder;
}

export function PermitOrderCard({ order }: PermitOrderCardProps) {
  return (
    <Link href={`/permit/order/${order.id}`} className="block">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full border border-background hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]">
        <PermitCardHeader order={order} getStatusStyle={getStatusStyle} />

        {/* Dashed separator */}
        <div className="relative h-0 border-t-2 border-dashed border-gray-200">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-gray-50 rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-gray-50 rounded-full" />
        </div>

        <PermitCardContent order={order} formatDate={formatDate} />
      </div>
    </Link>
  );
}
