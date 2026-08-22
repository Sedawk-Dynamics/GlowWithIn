import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { returnsPolicy } from "@/data/legal";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Shipping, Returns, Refunds & Cancellations",
  description:
    "Free shipping on all orders, 5–7 business-day delivery, and how returns, replacements, cancellations and refunds work for GlowWithin™ orders.",
  alternates: { canonical: routes.returns },
};

export default function ReturnPolicyPage() {
  return <LegalDoc doc={returnsPolicy} current={routes.returns} eyebrow="Customer care" />;
}
