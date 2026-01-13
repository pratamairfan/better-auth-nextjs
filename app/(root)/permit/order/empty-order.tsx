import React from "react";
import { Empty } from "@/components/ui/empty";
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ticket } from "lucide-react";

const EmptyOrder = () => {
  return (
    <Empty className="h-[calc(100vh-10rem)] flex items-center">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ticket />
        </EmptyMedia>
        <EmptyTitle>No Permit Order Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any permit order yet. Get started by creating
          your first permit order.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Link href="/permit/order/create">
            <Button className="hover:bg-background hover:text-foreground border-2 hover:cursor-pointer">
              Create Permit Order
            </Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyOrder;
