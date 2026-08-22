import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { termsPolicy } from "@/data/legal";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions governing the use of the GlowWithin™ website and the purchase of GlowWithin™ products. Effective 22 August 2026.",
  alternates: { canonical: routes.terms },
};

export default function TermsPage() {
  return <LegalDoc doc={termsPolicy} current={routes.terms} />;
}
