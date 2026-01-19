function Footer(){

  return(
    <footer id="footer">
      <div className='footContainer'>
        <div className="footLeft">
          <span className="footTitle">About Us</span>
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
        </div>
        <div className="footMid">
          <span className="footTitle">Contact Us</span>
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
        </div>
        <div className="footRight">
          <span className="footTitle">Newsletter Signup</span>
          <p>Get insider information about exclusive offers, events and more!</p>
          <div className="footEmailBox">
            <input className="footEmailInput" type="text" placeholder='Your email address'/>
            <button className="footEmailBtn">Submit</button>
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;