"use client";
import Link from "next/link";
import CardWrapper from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import EmptyOrder from "./empty-order";
import { dummyPermitOrders } from "./data";
import { PermitOrderCard } from "./permit-order-card";

export default function OrderClient() {
  const hasOrders = dummyPermitOrders && dummyPermitOrders.length > 0;

  return (
    <CardWrapper title="Permit Orders">
      <div className="flex justify-end items-center mb-6">
        <Link href="/permit/order/create">
          <Button className="hover:bg-background hover:text-foreground border-2 hover:cursor-pointer">
            Create Permit Order
          </Button>
        </Link>
      </div>

      {!hasOrders ? (
        <EmptyOrder />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {dummyPermitOrders.map((order) => (
            <PermitOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </CardWrapper>
  );
}
