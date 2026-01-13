import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PermitStatus } from "@/types";

// Helper function to get status badge styling
export const getStatusStyle = (status: string): string => {
  const normalizedStatus = status.toLowerCase() as Lowercase<PermitStatus>;

  const statusStyles: Record<Lowercase<PermitStatus>, string> = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    statusStyles[normalizedStatus] || "bg-gray-50 text-gray-700 border-gray-200"
  );
};

// Format date to Indonesian locale
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
