"use client";

import { useProfile, UserMenu } from "@/entities/user";
import { useBasket } from "@/entities/user/hooks/use-basket";
import { useLogout } from "@/features/logout";
import { AuthModal } from "@/widgets/auth-modal";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { Skeleton } from "@nextui-org/skeleton";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export function RightButtons() {
  const { data, isLoading, isError } = useProfile();
  const { data: basket } = useBasket();

  const { mutate } = useLogout();

  if (isLoading) {
    return (
      <>
        <Skeleton className="flex rounded-medium w-10 h-10" />
        <Skeleton className="flex rounded-full w-12 h-12" />
      </>
    );
  }

  const unAuthContent = (
    <>
      <NavbarItem>
        <AuthModal
          triggerVariant="bordered"
          triggerColor="default"
          authVariant="sign-in"
        />
      </NavbarItem>
      <NavbarItem>
        <AuthModal triggerVariant="solid" authVariant="sign-up" />
      </NavbarItem>
    </>
  );

  return (
    <>
      {data?.data && !isError ? (
        <>
          <NavbarItem>
            <Badge color="primary" content={basket?.data.count}>
              <Button as={Link} href="/basket" isIconOnly variant="light">
                <ShoppingCart />
              </Button>
            </Badge>
          </NavbarItem>
          <NavbarItem>
            <UserMenu user={data.data} onLogout={mutate} />
          </NavbarItem>
        </>
      ) : (
        unAuthContent
      )}
    </>
  );
}
