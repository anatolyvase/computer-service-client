import { ServiceCard } from "@/entities/service";
import React from "react";

export function ServicesPreviewList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard
        item={{
          imageUrl: "/repair.jpg",
          description: "Приедем и отремонтируем Ваш компьютер",
          isAvailable: true,
          id: "1",
          price: 1000,
          name: "Ремонт пк",
        }}
      />
      <ServiceCard
        item={{
          imageUrl: "/server.jpg",
          description: "Заменим или установим сервера",
          isAvailable: true,
          id: "2",
          price: 1000,
          name: "Серверное обслуживание",
        }}
      />
      <ServiceCard
        item={{
          imageUrl: "/cleaning.jpg",
          description: "Уберём всю пыль с вашего ПК",
          isAvailable: true,
          id: "3",
          price: 1000,
          name: "Чистка компьютера",
        }}
        className="md:col-span-2 lg:col-span-1"
      />
    </div>
  );
}
