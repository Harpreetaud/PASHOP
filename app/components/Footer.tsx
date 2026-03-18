import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links-grid">
          <div className="footer-col">
            <div className="footer-title">Stores</div>
            <a href="/stores">Find A Store</a>
            <a href="/pa-plus">P.A. Plus Stores</a>
            
            <div className="footer-col-spacer"></div>
            
            <div className="footer-title">About Us</div>
            <a href="/about">About Peter</a>
            <a href="/history">Our History</a>
            <a href="/charity">Our Charity</a>
            <a href="/careers">Careers</a>
            <a href="/better-practices">Better Practices</a>
            <a href="/brand-protection">Brand Protection</a>
          </div>

          <div className="footer-col">
            <div className="footer-title">Help &amp; Information</div>
            <a href="/delivery">Delivery Information</a>
            <a href="/track-order">Track Order</a>
            <a href="/returns">Returns &amp; Exchanges</a>
            <a href="/size">Size Guide</a>
            <a href="/personalisation">Personalisation</a>
            <a href="/gift-wrap">Gift Wrap</a>
            <a href="/customer-notices">Customer Notices</a>
            <a href="/contact">Help &amp; Contact Us</a>
          </div>

          <div className="footer-col">
            <div className="footer-title">Gift Cards</div>
            <a href="/gift-cards">Shop Gift Cards</a>
            <a href="/balance-enquiry">Balance Enquiry</a>
            <a href="/gift-card-help">Gift Card Help</a>

            <div className="footer-col-spacer"></div>

            <div className="footer-title">Peter's Dreamers</div>
            <a href="/join">Join The Dreamers</a>
            <a href="/rewards">About Membership &amp; Rewards</a>
            <a href="/terms">Terms &amp; Conditions</a>
          </div>

          <div className="footer-right">
            <div className="pa-footer-right-top">
              <div>
                <div className="footer-title">Get cosy with Peter</div>
                <div className="footer-region pa-region">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="footer-flag">
                    <rect width="512" height="512" fill="#000080"/>
                    <path fill="#fff" d="M0 0l512 512m0-512L0 512"/>
                    <path fill="#f00" d="M0 0l512 512m0-512L0 512" stroke="#fff" strokeWidth="30"/>
                    <path fill="#000080" d="M0 256h512v128H0zM256 0h128v512H256z"/>
                    <path fill="#fff" d="M0 213h512v86H0zm213 0h86v512h-86z"/>
                    <path fill="#f00" d="M0 230h512v52H0zm230 0h52v512h-52z"/>
                    <circle fill="#fff" cx="128" cy="384" r="30"/>
                  </svg>
                  <span className="pa-region-text">Delivery Country <strong>Australia</strong></span>
                </div>
              </div>
              <div className="footer-social-icons pa-social">
                <a href="#" aria-label="Facebook">
                  <svg className="footer-social-icon facebook-pa" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg className="footer-social-icon instagram-pa" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="footer-bottom">
        <a href="/terms-of-use">Terms Of Use</a>
        <span className="footer-bottom-divider">|</span>
        <a href="/privacy">Privacy</a>
      </div>
    </footer>
  );
}
