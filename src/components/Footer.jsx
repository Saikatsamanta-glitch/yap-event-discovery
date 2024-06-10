import React from 'react';
import { getEventCategories } from '@/services';
import { Divider } from '@/components';
import Image from 'next/image';
import NavbarFooterLogoLink from './NavbarFooterLogoLink';
import TrendingSearch from './TrendingSearch';
import CategoryLinks from './CategoryLinks';

const Footer = async () => {
  const data = await getEventCategories();

  return (
    <footer
      className="footer"
      data-qa-selector="event_discovery_footer_whole_footer"
    >
      <div className="footer__container">
        {data?.categories && data?.categories?.length && (
          <>
            <div className="footer-list">
              <p
                className="footer-list__header"
                data-qa-selector="footer_categories_label"
              >
                Categories
              </p>
              <ul className="footer-list__categories">
                {data?.categories?.map((category, index) => {
                  return (
                    <>
                      <CategoryLinks category={category} index={index} />
                      {data?.categories?.length - 1 !== index && (
                        <hr className="footer-list__vertical_divider" />
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
            <Divider className="footer-divider" dataQaSelector="footer" />
          </>
        )}
        <div className="footer__body">
          <div className="footer-list-logo-wrapper">
            <NavbarFooterLogoLink isNavbar={false} />
            <p
              className="footer-list__logo_content"
              data-qa-selector="footer_yapsody_events_description_label"
            >
              Yapsody Events - Discover Events From All Over The World
            </p>
            <div className="footer-list">
              <p
                className="footer-list__header"
                data-qa-selector="footer_follow_us_label"
              >
                Follow Us
              </p>
              <div className="footer-list-icons-wrapper">
                <a
                  data-qa-selector="footer_facebook_link"
                  href={'https://www.facebook.com/yapsodyllc/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="footer-list__icon"
                    data-qa-selector="event_discovery_event_details_yapsody_facebook_logo"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/footer/Facebook.svg`}
                      alt={'Facebook Logo'}
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  data-qa-selector="footer_instagram_link"
                  href={'https://www.instagram.com/yapsody/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="footer-list__icon"
                    data-qa-selector="event_discovery_event_details_yapsody_instagram_logo"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/footer/Instagram.svg`}
                      alt={'Instagram Logo'}
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  data-qa-selector="footer_linkedin_link"
                  href={'https://www.linkedin.com/company/yapsody/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="footer-list__icon"
                    data-qa-selector="event_discovery_event_details_yapsody_linkedin_logo"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/footer/LinkedIn.svg`}
                      alt={'LinkedIn Logo'}
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  data-qa-selector="footer_twitter_link"
                  href={'https://twitter.com/@Yapsody'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="footer-list__icon"
                    data-qa-selector="event_discovery_event_details_yapsody_twitter_logo"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/footer/X.svg`}
                      alt={'X Logo'}
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  data-qa-selector="footer_youtube_link"
                  href={'https://www.youtube.com/yapsody/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="footer-list__icon"
                    data-qa-selector="event_discovery_event_details_yapsody_youtube_logo"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/footer/Youtube.svg`}
                      alt={'Youtube Logo'}
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  data-qa-selector="footer_pintrest_link"
                  href={'https://www.pinterest.com/yapsody/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="footer-list__icon"
                    data-qa-selector="event_discovery_event_details_yapsody_pinterest_logo"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/footer/Pinterest.svg`}
                      alt={'Pinterest Logo'}
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <TrendingSearch />
          <div className="footer-list__items_wrapper">
            <p
              className="footer-list__header"
              data-qa-selector="footer_ticketing_label"
            >
              Ticketing
            </p>
            <ul>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_sell_tickets_online_link"
                  href="https://www.yapsody.com/ticketing/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sell Tickets Online
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_features_link"
                  href="https://www.yapsody.com/ticketing/features/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Features
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_pricing_link"
                  href="https://www.yapsody.com/ticketing/pricing/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pricing
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_special_offers_link"
                  href="https://www.yapsody.com/ticketing/offers/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Special Offers
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_event_categories_link"
                  href="https://www.yapsody.com/ticketing/event-categories/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Event Categories
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_affiliate_program_link"
                  href="https://www.yapsody.com/ticketing/offers/affiliate-program/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Affiliate Program
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_loyalty_program_link"
                  href="https://www.yapsody.com/ticketing/offers/loyalty-program/?utm_campaign=footer_eventdiscovery"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Loyalty Program
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-list__items_wrapper">
            <p
              className="footer-list__header"
              data-qa-selector="footer_company_label"
            >
              Company
            </p>
            <ul>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_about_us_link"
                  href="https://www.yapsody.com/ticketing/aboutus/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  About Us
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_contact_us_link"
                  href="https://www.yapsody.com/contact-us/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact Us
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_careers_link"
                  href="https://www.yapsody.com/careers/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Careers
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_eventsbot_link"
                  href="/bot"
                  className="footer-list__link"
                  rel="noreferrer"
                >
                  eventsBot
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_sell_tickets_link"
                  href="https://www.yapsody.com/ticketing/?utm_source=portal&utm_medium=eventdiscovery&utm_campaign=footer"
                  className="footer-list__link"
                  rel="noreferrer"
                  target="_blank"
                >
                  Sell Tickets
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_blogs_link"
                  href="/blogs"
                  className="footer-list__link"
                  rel="noreferrer"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-list__items_wrapper">
            <p
              className="footer-list__header"
              data-qa-selector="footer_others_label"
            >
              Others
            </p>
            <ul>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_terms_and_conditions_link"
                  href="https://www.yapsody.com/ticketing/terms-of-use/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="	footer_privacy_policy_link"
                  href="https://www.yapsody.com/ticketing/privacy-policy/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_security_link"
                  href="https://www.yapsody.com/ticketing/security/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Security
                </a>
              </li>
              <li className="footer-list__item">
                <a
                  data-qa-selector="footer_cookie_policy_link"
                  href="https://www.yapsody.com/ticketing/cookie-policy/"
                  className="footer-list__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright-label">
          <span data-qa-selector="footer_copy_rights_description_label">
            © {new Date()?.getFullYear?.()} · Yapsody LLC. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
