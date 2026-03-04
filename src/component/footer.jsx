import { useState, useEffect } from "react";

function FooterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return (
      <div className="footSection">
        <span className="footTitle">{title}</span>
        {children}
      </div>
    );
  }

  return (
    <div className={`footSection footAccordion${isOpen ? " open" : ""}`}>
      <button
        className="footAccordionBtn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="footTitle">{title}</span>
        <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`} />
      </button>
      <div className="footAccordionBody">
        {children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footContainer">
        <FooterSection title="About Us">
          <ul>
            <li><a href="#">Become an Ambassador</a></li>
            <li><a href="#">Frequent Steeper Program</a></li>
            <li><a href="#">Tea Horse Partnership</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Tea 101</a></li>
            <li><a href="#">Steeping Together Podcast</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Wholesale</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </FooterSection>

        <FooterSection title="Contact Us">
          <ul>
            <li><a href="#">Store Locator</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Contests & Promotions</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Investor Relations</a></li>
          </ul>
        </FooterSection>

        <div className="footRight">
          <span className="footTitle">Newsletter Signup</span>
          <p>Get insider information about exclusive offers, events and more!</p>
          <div className="footEmailBox">
            <input className="footEmailInput" type="text" placeholder="Your email address" />
            <button className="footEmailBtn">Submit</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
