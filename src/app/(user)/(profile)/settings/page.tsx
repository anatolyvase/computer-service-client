"use client";

import { AddressAddForm } from "@/features/address-add";
import { UserEditAccountForm } from "@/features/user-edit-account";
import { UserEditProfileForm } from "@/features/user-edit-profile";
import { PageLayout } from "@/shared/ui/page-layout";
import { AddressesList } from "@/widgets/addresses";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";

export default function UserSettingsPage() {
  return (
    <PageLayout className="items-start gap-8">
      <Section title="Адреса">
        <AddressesList />
      </Section>
      <Section id="add-address" title="Добавить новый адрес">
        <AddressAddForm />
      </Section>
      <Section title="Профиль">
        <UserEditProfileForm />
      </Section>
      <Section title="Безопасность">
        <UserEditAccountForm />
      </Section>
    </PageLayout>
  );
}

function Section({
  title,
  children,
  id,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <Card id={id} className="gap-6 w-full bg-content1">
      <CardHeader className="text-xl p-6 pb-0 font-semibold">
        {title}
      </CardHeader>
      <CardBody className="p-0">{children}</CardBody>
    </Card>
  );
}
