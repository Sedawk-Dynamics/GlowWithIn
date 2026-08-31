import { contact, primaryNav, routes, shopRoutes, type NavItem } from "@/lib/links";
import { headerTaglines } from "@/data/brand";
import { HeaderBehaviour } from "./HeaderBehaviour";

/**
 * Site header.
 *
 * This is the BeTheme "header builder" template (#66) from the live site,
 * reproduced element-for-element with the same class names so the copied
 * WordPress CSS styles it identically at every breakpoint:
 *
 *   - mobile section  (< 768px): logo · phone · cart · account · burger → side-slide drawer
 *   - desktop row 1   (≥ 768px): rotating tagline · centred logo · phone · Login · Cart
 *   - desktop row 2   (≥ 768px): main menu (SHOP has a hover dropdown)
 *
 * Only the behaviour is re-implemented (see <HeaderBehaviour>); none of the
 * theme's JavaScript is shipped.
 */

const LOGO = "/images/brand/glowwithin-logo.png";
/**
 * Mobile uses the same full logo as desktop. (The shop's header builder points
 * at WordPress's square site-icon crop, cropped-Glowwithin-logo1.png, which
 * slices the G and the final n off the wordmark — do not copy that here.)
 */
const LOGO_MOBILE = LOGO;
const ICON_PHONE = "/images/brand/header-icon1.svg";
const ICON_USER = "/images/brand/header-icon2.svg";
const ICON_CART = "/images/brand/header-icon3.svg";

function MenuItems({ items, variant }: { items: NavItem[]; variant: "drawer" | "main" }) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        return (
          <li
            key={item.label}
            className={`menu-item menu-item-type-post_type menu-item-object-page${hasChildren ? " menu-item-has-children" : ""} mfn-menu-li`}
          >
            <a href={item.href} className="mfn-menu-link">
              <span className="menu-item-helper mfn-menu-item-helper" />
              <span className="label-wrapper mfn-menu-label-wrapper">
                <span className="menu-label">{item.label}</span>
              </span>
              <span className="menu-sub mfn-menu-subicon">
                {variant === "drawer" ? <i className="fas fa-arrow-down" /> : <i className="icon-down-open-1" />}
              </span>
            </a>
            {hasChildren && (
              <ul className="sub-menu mfn-submenu">
                {item.children!.map((child) => (
                  <li
                    key={child.label}
                    className="menu-item menu-item-type-taxonomy menu-item-object-product_cat mfn-menu-li"
                  >
                    <a href={child.href} className="mfn-menu-link">
                      <span className="menu-item-helper mfn-menu-item-helper" />
                      <span className="label-wrapper mfn-menu-label-wrapper">
                        <span className="menu-label">{child.label}</span>
                      </span>
                      <span className="menu-sub mfn-menu-sub-subicon">
                        <i className="fas fa-arrow-right" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}

function HeaderIcon({
  href,
  icon,
  alt,
  label,
  extraClass = "",
  labelClass = "desc-wrapper hide-tablet hide-mobile",
  badge = false,
}: {
  href: string;
  icon: string;
  alt: string;
  label?: string;
  extraClass?: string;
  labelClass?: string;
  badge?: boolean;
}) {
  return (
    <a
      href={href}
      className={`mfn-icon-box mfn-header-icon-box mfn-icon-box-left mfn-icon-box-center ${extraClass}`}
      title={alt}
    >
      <div className="icon-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element -- small inline SVG icon, theme-styled */}
        <img className="scale-with-grid" src={icon} alt="" width={20} height={20} />
        {badge && <span className="header-cart-count mfn-header-icon-0">0</span>}
      </div>
      {label && <div className={labelClass}>{label}</div>}
    </a>
  );
}

export function SiteHeader() {
  return (
    <>
      <header
        id="mfn-header-template"
        data-id="66"
        data-mobile-type=""
        data-type="absolute"
        className="mfn-header-tmpl mfn-header-main mfn-header-tmpl-absolute mfn-header-body-offset mfn-hasMobile mfn-mobile-header-tmpl-fixed mfn-mobile-header-body-offset"
      >
        <div data-id="66" className="mfn-builder-content mfn-header-tmpl-builder">
          {/* ---------------- mobile header (< 768px) ---------------- */}
          <section className="section mcb-section mfn-header-mobile-section mcb-section-c744elkbh mcb-header-section close-button-left show-on-scroll">
            <div className="mcb-background-overlay" />
            <div className="section_wrapper mfn-wrapper-for-wraps mcb-section-inner mcb-section-inner-c744elkbh">
              <div
                className="wrap mcb-wrap mcb-wrap-0orsplana mcb-header-wrap one-second tablet-one-second laptop-one-second mobile-one vb-item clearfix"
                data-desktop-col="one-second"
                data-laptop-col="laptop-one-second"
                data-tablet-col="tablet-one-second"
                data-mobile-col="mobile-one"
              >
                <div className="mcb-wrap-inner mcb-wrap-inner-0orsplana mfn-module-wrapper mfn-wrapper-for-wraps">
                  <div className="mcb-wrap-background-overlay" />
                  <div className="column mcb-column mcb-item-4dmiazhwm one laptop-one tablet-one mobile-one column_header_logo mfn-item-custom-width vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-4dmiazhwm mcb-item-header_logo-inner">
                      <a className="logo-wrapper" href={routes.home} aria-label="GlowWithin — home">
                        {/* eslint-disable-next-line @next/next/no-img-element -- theme-sized logo */}
                        <img fetchPriority="high" src={LOGO_MOBILE} alt="GlowWithin™ — For Her, Forever" width={357} height={315} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="wrap mcb-wrap mcb-wrap-i2x5smqf4 mcb-header-wrap one-second tablet-one-second laptop-one-second mobile-one vb-item clearfix"
                data-desktop-col="one-second"
                data-laptop-col="laptop-one-second"
                data-tablet-col="tablet-one-second"
                data-mobile-col="mobile-one"
              >
                <div className="mcb-wrap-inner mcb-wrap-inner-i2x5smqf4 mfn-module-wrapper mfn-wrapper-for-wraps">
                  <div className="mcb-wrap-background-overlay" />
                  <div className="column mcb-column mcb-item-ddk9whlmc one laptop-one tablet-one mobile-one column_header_icon mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-ddk9whlmc mcb-item-header_icon-inner">
                      <HeaderIcon href={contact.phoneHref} icon={ICON_PHONE} alt={`Call ${contact.phone}`} label={contact.phone} extraClass="mfn-header-link" />
                    </div>
                  </div>
                  <div className="column mcb-column mcb-item-zld4d1gd5 one laptop-one tablet-one mobile-one column_header_icon mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-zld4d1gd5 mcb-item-header_icon-inner">
                      <HeaderIcon href={shopRoutes.cart} icon={ICON_CART} alt="Cart" label="Cart" extraClass="mfn-header-cart-link" badge />
                    </div>
                  </div>
                  <div className="column mcb-column mcb-item-i8zc3azoq one laptop-one tablet-one mobile-one column_header_icon mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-i8zc3azoq mcb-item-header_icon-inner">
                      <HeaderIcon href={shopRoutes.account} icon={ICON_USER} alt="My account" extraClass="mfn-header-account-link is-boxed mfn-icon-box-empty-desc" />
                    </div>
                  </div>
                  <div className="column mcb-column mcb-item-m4kmdo7yq one laptop-one tablet-one mobile-one column_header_burger mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-m4kmdo7yq mcb-item-header_burger-inner">
                      <a
                        data-nav="menu-main-menu"
                        href="#menu-main-menu"
                        className="mfn-icon-box mfn-header-menu-burger mfn-icon-box-top mfn-header-menu-toggle mfn-icon-box-empty-desc"
                        title="Menu"
                        aria-label="Open menu"
                        aria-controls="menu-main-menu"
                        aria-expanded="false"
                      >
                        <div className="icon-wrapper">
                          <i className="icon-menu-fine" aria-hidden="true" />
                        </div>
                      </a>
                      <div className="mfn-header-tmpl-menu-sidebar mfn-header-tmpl-menu-sidebar-right mfn-close-icon-pos-default" aria-expanded="false">
                        <div className="mfn-header-tmpl-menu-sidebar-wrapper">
                          <span className="mfn-close-icon mfn-header-menu-toggle" role="button" tabIndex={0} aria-label="Close menu">
                            <span className="icon">✕</span>
                          </span>
                          <ul
                            id="menu-main-menu"
                            className="mfn-header-menu mfn-menu-align-flex-start mfn-menu-align-laptop-flex-start mfn-menu-align-tablet-flex-start mfn-menu-align-mobile-flex-start mfn-items-align-top mfn-menu-icon-left mfn-menu-separator-off mfn-menu-submenu-on-click"
                          >
                            <MenuItems items={primaryNav} variant="drawer" />
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- desktop row 1: tagline · logo · icons ---------------- */}
          <section className="section mcb-section mfn-default-section mcb-section-1ovxpomsj mcb-header-section close-button-left show-on-scroll">
            <div className="mcb-background-overlay" />
            <div className="section_wrapper mfn-wrapper-for-wraps mcb-section-inner mcb-section-inner-1ovxpomsj">
              <div
                className="wrap mcb-wrap mcb-wrap-cruc6ff5 mcb-header-wrap one-third tablet-one-third laptop-one-third mobile-one hide-tablet hide-mobile mfn-item-custom-width vb-item clearfix"
                data-desktop-col="one-third"
                data-laptop-col="laptop-one-third"
                data-tablet-col="tablet-one-third"
                data-mobile-col="mobile-one"
              >
                <div className="mcb-wrap-inner mcb-wrap-inner-cruc6ff5 mfn-module-wrapper mfn-wrapper-for-wraps">
                  <div className="mcb-wrap-background-overlay" />
                  <div className="column mcb-column mcb-item-a8apgt5k one laptop-one tablet-one mobile-one column_html mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-a8apgt5k mcb-item-html-inner">
                      <div className="mfn-html-editor-wrapper">
                        <div
                          id="wellnessWrap"
                          data-taglines={JSON.stringify(headerTaglines)}
                          style={{
                            fontFamily: "Poppins, Arial, sans-serif",
                            fontSize: 16,
                            fontWeight: 500,
                            letterSpacing: "0.3px",
                            background: "linear-gradient(90deg,#be926c,#fdc5b8)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            transition: "opacity 0.6s ease",
                            opacity: 1,
                          }}
                        >
                          {headerTaglines[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="wrap mcb-wrap mcb-wrap-yv1h8cpst mcb-header-wrap one-third tablet-one-third laptop-one-third mobile-one mfn-item-custom-width vb-item clearfix"
                data-desktop-col="one-third"
                data-laptop-col="laptop-one-third"
                data-tablet-col="tablet-one-third"
                data-mobile-col="mobile-one"
              >
                <div className="mcb-wrap-inner mcb-wrap-inner-yv1h8cpst mfn-module-wrapper mfn-wrapper-for-wraps">
                  <div className="mcb-wrap-background-overlay" />
                  <div className="column mcb-column mcb-item-ohgoqpcbl one laptop-one tablet-one mobile-one column_header_logo mfn-item-custom-width vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-ohgoqpcbl mcb-item-header_logo-inner">
                      <a className="logo-wrapper" href={routes.home} aria-label="GlowWithin — home">
                        {/* eslint-disable-next-line @next/next/no-img-element -- theme-sized logo */}
                        <img fetchPriority="high" src={LOGO} alt="GlowWithin™ — For Her, Forever" width={357} height={315} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="wrap mcb-wrap mcb-wrap-wijy27mu mcb-header-wrap one-third tablet-one-third laptop-one-third mobile-one mfn-item-custom-width vb-item clearfix"
                data-desktop-col="one-third"
                data-laptop-col="laptop-one-third"
                data-tablet-col="tablet-one-third"
                data-mobile-col="mobile-one"
              >
                <div className="mcb-wrap-inner mcb-wrap-inner-wijy27mu mfn-module-wrapper mfn-wrapper-for-wraps">
                  <div className="mcb-wrap-background-overlay" />
                  <div className="column mcb-column mcb-item-i1qkmjz4p one laptop-one tablet-one mobile-one column_header_icon mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-i1qkmjz4p mcb-item-header_icon-inner">
                      <HeaderIcon href={contact.phoneHref} icon={ICON_PHONE} alt={`Call ${contact.phone}`} label={contact.phone} extraClass="mfn-header-link" />
                    </div>
                  </div>
                  <div className="column mcb-column mcb-item-pndn5ge0a one laptop-one tablet-one mobile-one column_header_icon mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-pndn5ge0a mcb-item-header_icon-inner">
                      <HeaderIcon href={shopRoutes.account} icon={ICON_USER} alt="Login / My account" label="Login" labelClass="desc-wrapper" extraClass="mfn-header-account-link is-boxed" />
                    </div>
                  </div>
                  <div className="column mcb-column mcb-item-m17nwknfc one laptop-one tablet-one mobile-one column_header_icon mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-m17nwknfc mcb-item-header_icon-inner">
                      <HeaderIcon href={shopRoutes.cart} icon={ICON_CART} alt="Cart" label="Cart" extraClass="mfn-header-cart-link" badge />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- desktop row 2: main menu ---------------- */}
          <section className="section mcb-section mfn-default-section mcb-section-c9b66f6gb mcb-header-section close-button-left show-on-scroll">
            <div className="mcb-background-overlay" />
            <div className="section_wrapper mfn-wrapper-for-wraps mcb-section-inner mcb-section-inner-c9b66f6gb">
              <div
                className="wrap mcb-wrap mcb-wrap-xfg76mc7a mcb-header-wrap one tablet-one laptop-one mobile-one vb-item clearfix"
                data-desktop-col="one"
                data-laptop-col="laptop-one"
                data-tablet-col="tablet-one"
                data-mobile-col="mobile-one"
              >
                <div className="mcb-wrap-inner mcb-wrap-inner-xfg76mc7a mfn-module-wrapper mfn-wrapper-for-wraps">
                  <div className="mcb-wrap-background-overlay" />
                  <div className="column mcb-column mcb-item-swmm9mcbs one laptop-one tablet-one mobile-one column_header_menu mfn-item-inline vb-item">
                    <div className="mcb-column-inner mfn-module-wrapper mcb-column-inner-swmm9mcbs mcb-item-header_menu-inner">
                      <ul
                        id="menu-main-menu-1"
                        className="mfn-header-menu mfn-header-mainmenu mfn-menu-align-flex-start mfn-menu-tablet-align-flex-start mfn-menu-mobile-align-flex-start mfn-menu-icon-left mfn-menu-animation-toggle-line-bottom mfn-menu-separator-off mfn-menu-submenu-on-hover"
                      >
                        <MenuItems items={primaryNav} variant="main" />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
      <HeaderBehaviour />
    </>
  );
}
