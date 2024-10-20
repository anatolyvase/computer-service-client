import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";

export function FeedbackForm() {
  return (
    <form className="space-y-3">
      <Input placeholder="Ваше имя" />
      <Input placeholder="Ваше email" />
      <Textarea placeholder="Ваш вопрос" />
      <Button>Отправить</Button>
    </form>
  );
}
