"use client";
import { IAddress, useAddresses, useBasket } from "@/entities/user";
import { PlaceOrderForm } from "@/features/place-order";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export function PlaceOrderModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    data: services,
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useBasket();
  const { data: addresses, isLoading, isError } = useAddresses();

  if (isLoading || isServicesLoading) {
    return <Skeleton className="h-10 w-full rounded-medium" />;
  }

  const addressesData = addresses?.data as IAddress[];
  if (isError || !addressesData) {
    return <div>Ошибка загрузки адресов</div>;
  }

  if (isServicesError) {
    return <div>Ошибка загрузки услуг</div>;
  }

  return (
    <>
      <Button
        onPress={onOpen}
        isDisabled={services?.data?.items.length === 0}
        color="primary"
      >
        Оформить заказ
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Оформить заказ
              </ModalHeader>
              <ModalBody>
                <PlaceOrderForm
                  onClose={onClose}
                  services={services?.data?.items || []}
                  addresses={addressesData}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
