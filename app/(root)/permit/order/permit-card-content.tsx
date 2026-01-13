import { PermitOrder } from "@/types";

interface PermitCardContentProps {
  order: PermitOrder;
  formatDate: (date: string) => string;
}

export function PermitCardContent({
  order,
  formatDate,
}: PermitCardContentProps) {
  return (
    <div className="px-8 py-6 bg-linear-to-b from-white to-gray-50">
      {/* Main Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <InfoField label="Applicant" value={order.applicantName} />
        <InfoField label="Permit Holder" value={order.permitHolder} />
        <InfoField label="Issue Date" value={formatDate(order.issueDate)} />
        <InfoField label="Expiry Date" value={formatDate(order.expiryDate)} />
      </div>

      {/* Location */}
      <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
          Location
        </p>
        <p className="text-gray-900 font-semibold text-sm leading-relaxed">
          {order.location}
        </p>
      </div>

      {/* Footer with Zone, Reference, and QR */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
        <div className="flex gap-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Zone
            </p>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-slate-800 text-white font-bold text-lg rounded-lg">
              {order.zone}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Reference
            </p>
            <p className="text-slate-800 font-bold text-base font-mono">
              {order.reference}
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="shrink-0 p-2 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
          <img
            src={order.qrCodeRef}
            alt="QR Code"
            className="w-20 h-20 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

// Reusable info field component
function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-gray-900 font-semibold text-sm">{value}</p>
    </div>
  );
}
