import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/Footer.css'

function Footer() {
  return (
    <footer className="bg-light py-4">
      <div className="container">
        <div className="row">
          {/* Company Section */}
          <div className="col-md-3 mb-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><Link to="https://www.washingtonpost.com/about-the-post/" className="text-dark">About The Post</Link></li>
              <li><Link to="https://www.washingtonpost.com/policies-and-standards/" className="text-dark">Newsroom Policies & Standards</Link></li>
              <li><Link to="https://washingtonpost.com/about-the-post/workforce-demographics/" className="text-dark">Diversity & Inclusion</Link></li>
              <li><Link to="https://careers.washingtonpost.com/" className="text-dark">Careers</Link></li>
              <li><Link to="https://www.washingtonpost.com/public-relations/" className="text-dark">Media & Community Relations</Link></li>
              <li><Link to="https://www.washingtonpost.com/brand-studio/archive/" className="text-dark">WP Creative Group</Link></li>
              <li><Link to="https://www.washingtonpost.com/accessibility" className="text-dark">Accessibility Statement</Link></li>
              <li><Link to="https://www.washingtonpost.com/sitemap" className="text-dark">Sitemap</Link></li>
            </ul>
          </div>

          {/* Get The Post Section */}
          <div className="col-md-3 mb-3">
            <h5>Get The Post</h5>
            <ul className="list-unstyled">
              <li><Link to="https://subscribe.washingtonpost.com/acquisition/?p=s_v&s_l=ONSITE_FOOTER_DIGITAL" className="text-dark">Become a Subscriber</Link></li>
              <li><Link to="https://subscribe.washingtonpost.com/acquisition/?p=g_v&s_l=ONSITE_FOOTER_GIFT" className="text-dark">Gift Subscriptions</Link></li>
              <li><Link to="https://subscription.washingtonpost.com/mobile/" className="text-dark">Mobile & Apps</Link></li>
              <li><Link to="https://washingtonpost.com/newsletters/" className="text-dark">Newsletters & Alerts</Link></li>
              <li><Link to="https://www.washingtonpost.com/washington-post-live/" className="text-dark">Washington Post Live</Link></li>
              <li><Link to="https://www.washingtonpost.com/reprints-permissions/" className="text-dark">Reprints & Permissions</Link></li>
              <li><Link to="https://store.washingtonpost.com/" className="text-dark">Post Store</Link></li>
              <li><Link to="https://www.washingtonpost.com/photos-books/" className="text-dark">Books & E-Books</Link></li>
              <li><Link to="https://search.proquest.com/?accountid=189667" className="text-dark">Print Archives (Subscribers Only)</Link></li>
              <li><Link to="https://www.washingtonpost.com/todays_paper/updates" className="text-dark">Today’s Paper</Link></li>
              <li><Link to="https://www.washingtonpost.com/classifieds" className="text-dark">Public Notices</Link></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-3 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><Link to="https://helpcenter.washingtonpost.com/hc/en-us/articles/360002940991-Leadership-of-The-Washington-Post-newsroom" className="text-dark">Contact the Newsroom</Link></li>
              <li><Link to="https://helpcenter.washingtonpost.com/hc/en-us/" className="text-dark">Contact Customer Care</Link></li>
              <li><Link to="https://helpcenter.washingtonpost.com/hc/en-us/articles/360004745292-Leadership-of-The-Washington-Post-Opinions-section" className="text-dark">Contact the Opinions Team</Link></li>
              <li><Link to="https://www.washingtonpost.com/mediakit/" className="text-dark">Advertise</Link></li>
              <li><Link to="https://www.washingtonpost.com/syndication/" className="text-dark">Licensing & Syndication</Link></li>
              <li><Link to="https://helpcenter.washingtonpost.com/hc/en-us/articles/115003675928-Submit-a-correction" className="text-dark">Request a Correction</Link></li>
              <li><Link to="https://www.washingtonpost.com/anonymous-news-tips/" className="text-dark">Send a News Tip</Link></li>
              <li><Link to="https://www.washingtonpost.com/discussions/2021/05/13/vulnerability-disclosure-policy/" className="text-dark">Report a Vulnerability</Link></li>
            </ul>
          </div>

          {/* Terms of Use Section */}
          <div className="col-md-3 mb-3">
            <h5>Terms of Use</h5>
            <ul className="list-unstyled">
              <li><Link to="https://www.washingtonpost.com/information/2022/06/17/terms-sale-digital-products/" className="text-dark">Digital Products Terms of Sale</Link></li>
              <li><Link to="https://www.washingtonpost.com/information/2020/11/20/terms-sale-print-products/" className="text-dark">Print Products Terms of Sale</Link></li>
              <li><Link to="https://www.washingtonpost.com/information/2022/01/01/terms-of-service/" className="text-dark">Terms of Service</Link></li>
              <li><Link to="https://www.washingtonpost.com/privacy-policy/" className="text-dark">Privacy Policy</Link></li>
              <li><Link to="https://www.washingtonpost.com/cookie-policy/" className="text-dark">Cookie Settings</Link></li>
              <li><Link to="https://www.washingtonpost.com/discussions/2021/11/23/discussion-submission-guidelines/" className="text-dark">Submissions & Discussion Policy</Link></li>
              <li><Link to="https://www.washingtonpost.com/discussions/2021/01/01/rss-terms-service/" className="text-dark">RSS Terms of Service</Link></li>
              <li><Link to="https://www.washingtonpost.com/information/2022/01/01/ad-choices/" className="text-dark">Ad Choices</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-3">
          <Link to="https://www.washingtonpost.com" className="text-dark">washingtonpost.com</Link> © 1996-2024 The Washington Post
        </div>
      </div>
    </footer>
  );
}

export default Footer;
