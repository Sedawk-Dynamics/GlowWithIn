import { contact, customerServiceNav, importantNav, usefulNav, categoryNav, routes, type NavItem } from "@/lib/links";

/**
 * Site footer — BeTheme footer builder template (#148) from the live site,
 * same structure and class names so the ported CSS applies unchanged.
 *
 * Link corrections vs. the live site: the "Customer service" column pointed at
 * the theme demo (themes.muffingroup.com), the email box at noreply@envato.com
 * and the phone box at an Australian demo number; all now resolve through
 * src/lib/links.ts.
 */

const LOGO = "/images/brand/glowwithin-logo.png";

function Wrap({
  cls,
  cols,
  nested = false,
  children,
}: {
  cls: string;
  cols: { d: string; l: string; t: string; m: string };
  nested?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`wrap mcb-wrap ${cls} ${cols.d} ${cols.t} ${cols.l} ${cols.m}${nested ? " mfn-nested-wrap" : ""} vb-item clearfix`}
      data-desktop-col={cols.d}
      data-laptop-col={cols.l}
      data-tablet-col={cols.t}
      data-mobile-col={cols.m}
    >
      <div className={`mcb-wrap-inner ${cls.replace("mcb-wrap-", "mcb-wrap-inner-")} mfn-module-wrapper mfn-wrapper-for-wraps`}>
        <div className="mcb-wrap-background-overlay" />
        {children}
      </div>
    </div>
  );
}

function MenuColumn({ id, wrapCls, headingCls, menuCls, title, items }: { id: number; wrapCls: string; headingCls: string; menuCls: string; title: string; items: NavItem[] }) {
  return (
    <Wrap cls={wrapCls} cols={{ d: "one-fourth", l: "laptop-one-fourth", t: "tablet-one-fourth", m: "mobile-one-second" }}>
      <div className={`column mcb-column ${headingCls} one laptop-one tablet-one mobile-one column_heading vb-item`}>
        <div className={`mcb-column-inner mfn-module-wrapper ${headingCls.replace("mcb-item-", "mcb-column-inner-")} mcb-item-heading-inner`}>
          <p className="title">{title}</p>
        </div>
      </div>
      <div className={`column mcb-column ${menuCls} one laptop-one tablet-one mobile-one column_footer_menu vb-item`}>
        <div className={`mcb-column-inner mfn-module-wrapper ${menuCls.replace("mcb-item-", "mcb-column-inner-")} mcb-item-footer_menu-inner`}>
          <ul id={`mfn-footer-menu-${id}`} className="mfn-footer-menu mfn-footer-menu-style-vertical">
            {items.map((item) => (
              <li key={item.label} className="menu-item menu-item-type-custom menu-item-object-custom">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrap>
  );
}

function SocialIcon({ cls, icon, href, label }: { cls: string; icon: string; href: string; label: string }) {
  return (
    <div className={`column mcb-column ${cls} one laptop-one tablet-one mobile-one column_icon_box_2 mfn-item-inline vb-item`}>
      <div className={`mcb-column-inner mfn-module-wrapper ${cls.replace("mcb-item-", "mcb-column-inner-")} mcb-item-icon_box_2-inner`}>
        <a href={href} title={label} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
          <div className="mfn-icon-box mfn-icon-box-top mfn-icon-box-center mfn-icon-box-move-up">
            <div className="icon-wrapper">
              <i className={`${icon} primary`} aria-hidden="true" />
            </div>
            <div className="desc-wrapper" />
          </div>
        </a>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="mfn-footer-template" data-id="148" className="mfn-footer-tmpl mfn-footer">
      <div data-id="148" className="mfn-builder-content mfn-footer-tmpl-builder">
        <section className="section mcb-section mfn-default-section mcb-section-odmmd6bjs">
          <div className="mcb-background-overlay" />
          <div className="section_wrapper mfn-wrapper-for-wraps mcb-section-inner mcb-section-inner-odmmd6bjs">
            {/* logo */}
            <Wrap cls="mcb-wrap-c4hrkfkkp" cols={{ d: "one", l: "laptop-one", t: "tablet-one", m: "mobile-one" }}>
              <div className="column mcb-column mcb-item-emncdgkyr one laptop-one tablet-one mobile-one column_footer_logo mfn-item-custom-width vb-item">
                <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-emncdgkyr mcb-item-footer_logo-inner">
                  <a className="logo-wrapper" href={routes.home} aria-label="GlowWithin — home">
                    {/* eslint-disable-next-line @next/next/no-img-element -- theme-sized logo */}
                    <img src={LOGO} alt="GlowWithin™ — For Her, Forever" width={357} height={315} loading="lazy" />
                  </a>
                </div>
              </div>
            </Wrap>

            {/* phone · social · email */}
            <Wrap cls="mcb-wrap-1rx0tofap" cols={{ d: "one", l: "laptop-one", t: "tablet-one", m: "mobile-one" }}>
              <div className="column mcb-column mcb-item-1e5266702 one-third laptop-one-third tablet-three-fifth mobile-one column_icon_box_2 vb-item">
                <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-1e5266702 mcb-item-icon_box_2-inner">
                  <a href={contact.phoneHref} title={`Call ${contact.phone}`}>
                    <div className="mfn-icon-box mfn-icon-box-top mfn-icon-box-center">
                      <div className="icon-wrapper">
                        <i className="icon-phone-1 primary" aria-hidden="true" />
                      </div>
                      <div className="desc-wrapper">
                        <h3 className="title label ">{contact.phone}</h3>
                        <div className="desc">Got a question? Call us 24/7!</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <Wrap cls="mcb-wrap-v3pxpmay8" cols={{ d: "one-third", l: "laptop-one-third", t: "tablet-three-fifth", m: "mobile-one" }} nested>
                <div className="column mcb-column mcb-item-bd92c455a one laptop-one tablet-one mobile-one column_plain_text vb-item">
                  <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-bd92c455a mcb-item-plain_text-inner">
                    <div className="desc">Follow us</div>
                  </div>
                </div>
                <SocialIcon cls="mcb-item-80fbc77ec" icon="icon-facebook" href={contact.social.facebook} label="Facebook" />
                <SocialIcon cls="mcb-item-b80e6146b" icon="icon-instagram" href={contact.social.instagram} label="Instagram" />
                <SocialIcon cls="mcb-item-c0709ff5c" icon="icon-pinterest" href={contact.social.pinterest} label="Pinterest" />
              </Wrap>
              <div className="column mcb-column mcb-item-44de13048 one-third laptop-one-third tablet-three-fifth mobile-one column_icon_box_2 vb-item">
                <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-44de13048 mcb-item-icon_box_2-inner">
                  <a href={contact.emailHref} title={`Email ${contact.email}`}>
                    <div className="mfn-icon-box mfn-icon-box-top mfn-icon-box-center">
                      <div className="icon-wrapper">
                        <i className="icon-email primary" aria-hidden="true" />
                      </div>
                      <div className="desc-wrapper">
                        <h3 className="title label ">{contact.email}</h3>
                        <div className="desc">Write a message</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Wrap>

            {/* four link columns */}
            <MenuColumn id={17} wrapCls="mcb-wrap-myc6maeu" headingCls="mcb-item-r1lhlbwms" menuCls="mcb-item-wcbsdx435" title="Customer service" items={customerServiceNav} />
            <MenuColumn id={18} wrapCls="mcb-wrap-2eokrgm7h" headingCls="mcb-item-eb2ct8sta" menuCls="mcb-item-le0c6yqs6" title="Useful links" items={usefulNav} />
            <MenuColumn id={19} wrapCls="mcb-wrap-gch01fj5y" headingCls="mcb-item-8d41mb48h" menuCls="mcb-item-8ccc3xtlo" title="Important Links" items={importantNav} />
            <MenuColumn id={20} wrapCls="mcb-wrap-v6wetxeo2" headingCls="mcb-item-63zfr3h2" menuCls="mcb-item-ivfv1nz8b" title="Categories" items={categoryNav} />

            {/* copyright */}
            <Wrap cls="mcb-wrap-2kn3xsqlm" cols={{ d: "one", l: "laptop-one", t: "tablet-one", m: "mobile-one" }}>
              <div className="column mcb-column mcb-item-noyd0wqyk three-fifth laptop-three-fifth tablet-one mobile-one column_plain_text vb-item">
                <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-noyd0wqyk mcb-item-plain_text-inner">
                  <div className="desc">
                    © {year} GlowWithin<sup className="gw-tm">™</sup> | {contact.legalName} | All Rights Reserved | Designed &amp; Developed By{" "}
                    <a href="https://webel.io/" target="_blank" rel="noopener noreferrer">
                      Webel.io
                    </a>
                  </div>
                </div>
              </div>
            </Wrap>
          </div>
        </section>
      </div>
    </footer>
  );
}
