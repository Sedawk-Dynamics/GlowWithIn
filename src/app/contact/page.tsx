import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icons";
import { contact, routes, shopRoutes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact GlowWithin™ — We'd love to hear from you",
  description: `Write to ${contact.email} or call ${contact.phone}. Sri Varamaha Wellness (P) Ltd., Rainbow Vistas, Moosapet, Hyderabad – 500018. ${contact.hours}.`,
  alternates: { canonical: routes.contact },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch right here." lead="Questions about a product, an order, or working together? We read every message." />

      <section className="gw-section bg-white" aria-label="Contact details">
        <div className="gw-container">
          <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
            <li className="gw-card text-center">
              <div className="flex justify-center">
                <Icon name="phone" />
              </div>
              <h2 className="mt-4 mb-1 font-serif text-[25px] leading-tight text-ink">
                <a href={contact.phoneHref} className="text-ink no-underline hover:text-wine">
                  {contact.phone}
                </a>
              </h2>
              <p className="m-0 text-[14px] text-muted">Got a question? Call us 24/7!</p>
            </li>
            <li className="gw-card text-center">
              <div className="flex justify-center">
                <Icon name="mail" />
              </div>
              <h2 className="mt-4 mb-1 font-serif text-[25px] leading-tight text-ink">
                <a href={contact.emailHref} className="text-ink no-underline hover:text-wine">
                  {contact.email}
                </a>
              </h2>
              <p className="m-0 text-[14px] text-muted">Write a message</p>
            </li>
            <li className="gw-card text-center">
              <div className="flex justify-center">
                <Icon name="pin" />
              </div>
              <h2 className="mt-4 mb-1 font-serif text-[22px] leading-tight text-ink">{contact.legalName}</h2>
              <p className="m-0 text-[14px] leading-6 text-muted">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </li>
            <li className="gw-card text-center">
              <div className="flex justify-center">
                <Icon name="clock" />
              </div>
              <h2 className="mt-4 mb-1 font-serif text-[25px] leading-tight text-ink">Working hours</h2>
              <p className="m-0 text-[14px] leading-6 text-muted">{contact.hours}</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="gw-section bg-cream" aria-labelledby="form-heading">
        <div className="gw-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="gw-eyebrow">Write to us</p>
            <h2 id="form-heading" className="gw-h2">
              We&apos;d love to hear from you.
            </h2>
            <hr className="gw-rule" />
            <p className="m-0 text-[16px] leading-7 text-ink/85">
              For order status, returns or account help, the fastest route is your account on the shop.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={shopRoutes.orders} className="gw-btn gw-btn--outline">
                My orders
              </a>
              <a href={shopRoutes.account} className="gw-btn gw-btn--outline">
                My account
              </a>
            </div>
            <p className="mt-8 mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-mocha">Follow us</p>
            <ul className="m-0 flex list-none flex-wrap gap-5 p-0 text-[14px] font-semibold">
              {[
                ["Instagram", contact.social.instagram],
                ["Facebook", contact.social.facebook],
                ["LinkedIn", contact.social.linkedin],
                ["X", contact.social.x],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="gw-link" target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
