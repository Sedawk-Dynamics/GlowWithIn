import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { privacyPolicy } from "@/data/legal";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GlowWithin™ (Sri Varamaha Wellness (P) Ltd.) collects, uses, stores and shares your personal information. Effective 22 August 2026.",
  alternates: { canonical: routes.privacy },
};

export default function PrivacyPage() {
  return <LegalDoc doc={privacyPolicy} current={routes.privacy} />;
}
