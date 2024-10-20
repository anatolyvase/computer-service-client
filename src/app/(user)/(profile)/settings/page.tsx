import { UserEditAccountForm } from "@/features/user-edit-account";
import { UserEditProfileForm } from "@/features/user-edit-profile";
import { PageHeading } from "@/shared/ui/page-heading";
import { PageLayout } from "@/shared/ui/page-layout";
import React from "react";

export default function UserSettingsPage() {
  return (
    <PageLayout className="items-start py-6 gap-6">
      <PageHeading title="Настройки" />
      <section className="space-y-2 w-full">
        <h2 className="text-lg">Профиль</h2>
        <UserEditProfileForm />
      </section>
      <section className="space-y-2 w-full">
        <h2 className="text-lg">Безопасность</h2>
        <UserEditAccountForm />
      </section>
      <section className="space-y-2 w-full">
        <h2 className="text-lg">Адрес</h2>
      </section>
    </PageLayout>
  );
}
