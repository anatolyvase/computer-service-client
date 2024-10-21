"use client";

import { AddressAddForm } from "@/features/address-add";
import { UserEditAccountForm } from "@/features/user-edit-account";
import { UserEditProfileForm } from "@/features/user-edit-profile";
import { PageHeading } from "@/shared/ui/page-heading";
import { PageLayout } from "@/shared/ui/page-layout";
import { AddressesList } from "@/widgets/addresses";
import React from "react";

export default function UserSettingsPage() {
  return (
    <PageLayout className="items-start py-6 gap-6">
      <PageHeading title="Настройки" />
      <section className="space-y-2 w-full">
        <h2 className="text-lg">Адреса</h2>
        <AddressesList />
      </section>
      <section id="add-address" className="space-y-2 w-full">
        <h2 className="text-lg">Добавить новый адрес</h2>
        <AddressAddForm />
      </section>
      <section className="space-y-2 w-full">
        <h2 className="text-lg">Профиль</h2>
        <UserEditProfileForm />
      </section>
      <section className="space-y-2 w-full">
        <h2 className="text-lg">Безопасность</h2>
        <UserEditAccountForm />
      </section>
    </PageLayout>
  );
}
