import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Legal";
import { contact, routes, SHOP_ORIGIN } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing the use of glowwithin.co.in and purchases made on the GlowWithin™ online shop.",
  alternates: { canonical: routes.terms },
};

const shopHost = SHOP_ORIGIN.replace("https://", "");

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="August 2026">
      <p>
        These terms govern your use of glowwithin.co.in and any purchase made through our online shop at {shopHost}, both operated by{" "}
        {contact.legalName}. By using the sites you agree to these terms.
      </p>
      <h2>Products and claims</h2>
      <p>
        GlowWithin<sup className="gw-tm">™</sup> products are cosmetic and personal-care products intended for external use only. They are not medicines and are not intended to
        diagnose, treat, cure or prevent any disease. Always read the label, follow the directions for use and discontinue use if irritation occurs.
        Perform a patch test before first use. Product descriptions use careful, responsible language; individual experiences may vary.
      </p>
      <h2>Orders, pricing and payment</h2>
      <ul>
        <li>All prices are in Indian Rupees and inclusive of applicable taxes unless stated otherwise.</li>
        <li>
          An order is accepted when we send an order confirmation. We may decline or cancel an order where a product is unavailable, a price was listed
          in error, or we suspect fraud, in which case any amount paid is refunded in full.
        </li>
        <li>Payments are processed securely by our payment partner on the shop.</li>
      </ul>
      <h2>Shipping, returns and refunds</h2>
      <p>
        Delivery timelines, shipping charges and our return and refund process are described at checkout and in your order confirmation. For hygiene
        reasons, opened or used personal-care products cannot be returned unless they are damaged or defective on arrival. Please contact us within 48
        hours of delivery with photographs for a damaged or incorrect item and we will replace it or refund you.
      </p>
      <h2>Accounts</h2>
      <p>You are responsible for keeping your shop account credentials confidential and for all activity under your account.</p>
      <h2>Intellectual property</h2>
      <p>
        GlowWithin<sup className="gw-tm">™</sup>, the GlowWithin<sup className="gw-tm">™</sup> logo, product names, images and all website content are the property of {contact.legalName} or its licensors and
        may not be reproduced without written permission.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, our liability in connection with any order is limited to the amount paid for that order. Nothing in these
        terms limits rights you have under the Consumer Protection Act, 2019.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at Hyderabad, Telangana have exclusive jurisdiction.</p>
      <h2>Contact</h2>
      <p>
        {contact.legalName}, {contact.addressLines.join(" ")} Email <a href={contact.emailHref}>{contact.email}</a> · Phone{" "}
        <a href={contact.phoneHref}>{contact.phone}</a>.
      </p>
    </LegalPage>
  );
}
