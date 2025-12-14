"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// Mapping untuk nama halaman yang lebih user-friendly
const pageNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  permit: "Permit App",
  order: "Permit Order",
  list: "List Permit",
  inventory: "Inventory",
  site: "Site / STO",
  user: "User",
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Split pathname dan filter empty strings
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Jika di root atau tidak ada segments, tampilkan Dashboard
  if (pathSegments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const displayName =
            pageNameMap[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <div key={href} className="contents">
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
