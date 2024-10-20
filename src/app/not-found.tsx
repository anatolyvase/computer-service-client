import { PageLayout } from "@/shared/ui/page-layout";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageLayout className="justify-center">
      <Image src="/not-found.svg" alt="Not Found" className="w-96 h-96" />
      <Button startContent={<Home />} as={Link} href="/" variant="light">
        Back to Home
      </Button>
    </PageLayout>
  );
}
