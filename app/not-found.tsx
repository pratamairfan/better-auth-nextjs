import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { BadgeAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Empty className="h-[calc(100vh-4rem)] flex items-center">
      <EmptyHeader>
        <EmptyTitle className="flex items-center">
          <BadgeAlert className="mr-2 h-6 w-6 text-red-500" />
          <h1>404 - Not Found</h1>
        </EmptyTitle>
        <EmptyDescription>
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          <Link href="/dashboard">Kembali ke dashboard</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
