import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Legal";
import { contact, routes, SHOP_ORIGIN } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GlowWithin™ (Sri Varamaha Wellness (P) Ltd.) collects, uses and protects your personal information.",
  alternates: { canonical: routes.privacy },
};

const shopHost = SHOP_ORIGIN.replace("https://", "");

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <p>
        {contact.legalName} (&ldquo;GlowWithin<sup className="gw-tm">™</sup>&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what personal
        information we collect through glowwithin.co.in and our online shop at {shopHost}, why we collect it, and the choices you have.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us</strong> — your name, email address, phone number, delivery and billing address, and the content of messages
          you send us through the contact form.
        </li>
        <li>
          <strong>Order information</strong> — products purchased, order value and delivery details, processed on our shop. Card and UPI payments are
          handled by our payment partner; we never see or store your full payment details.
        </li>
        <li>
          <strong>Technical information</strong> — IP address, browser and device type, pages visited and referring pages, collected through cookies and
          similar technologies to keep the site secure and understand how it is used.
        </li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To process and deliver your orders and provide customer support.</li>
        <li>To respond to your enquiries.</li>
        <li>To send order updates and, only if you opt in, news about GlowWithin<sup className="gw-tm">™</sup> products. You can unsubscribe at any time.</li>
        <li>To keep our websites secure, prevent fraud and improve our products and services.</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We share personal information only with service providers who help us run the business — payment gateways, courier partners, our hosting and
        email providers — and only as needed for them to perform their services. We do not sell your personal information.
      </p>
      <h2>Cookies</h2>
      <p>
        Our shop uses essential cookies to keep your cart and login working, and may use analytics cookies to understand site usage. You can control
        cookies through your browser settings; disabling essential cookies will prevent checkout from working.
      </p>
      <h2>Your rights</h2>
      <p>
        You may ask us to access, correct or delete the personal information we hold about you, or withdraw consent to marketing, by writing to{" "}
        <a href={contact.emailHref}>{contact.email}</a>. We will respond within a reasonable time and in line with applicable Indian data-protection law,
        including the Digital Personal Data Protection Act, 2023.
      </p>
      <h2>Security and retention</h2>
      <p>
        We use appropriate technical and organisational measures to protect your information, and keep it only as long as needed for the purposes above
        or as required by law.
      </p>
      <h2>Contact</h2>
      <p>
        {contact.legalName}, {contact.addressLines.join(" ")} Email <a href={contact.emailHref}>{contact.email}</a> · Phone{" "}
        <a href={contact.phoneHref}>{contact.phone}</a>.
      </p>
    </LegalPage>
  );
}
