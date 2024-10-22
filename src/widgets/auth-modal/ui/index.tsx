"use client";
import { UserSignInForm } from "@/features/sign-in";
import { UserSignUpForm } from "@/features/sign-up";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import React from "react";

export function AuthModal({
  authVariant,
  triggerVariant = "solid",
  triggerColor = "primary",
}: {
  authVariant?: "sign-in" | "sign-up";
  triggerVariant:
    | "solid"
    | "light"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  triggerColor?: "primary" | "secondary" | "default";
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color={triggerColor} variant={triggerVariant}>
        {authVariant === "sign-in" ? "Вход" : "Регистрация"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) =>
            authVariant === "sign-in" ? (
              <>
                <ModalHeader className="flex flex-col gap-1">Вход</ModalHeader>
                <ModalBody>
                  <UserSignInForm onClose={onClose} />
                </ModalBody>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Регистрация
                </ModalHeader>
                <ModalBody>
                  <UserSignUpForm onClose={onClose} />
                </ModalBody>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
}
