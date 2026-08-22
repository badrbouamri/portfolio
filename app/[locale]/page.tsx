import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <Section>
      <p className="font-data text-sm text-steel">{t("pending_note")}</p>
    </Section>
  );
}
