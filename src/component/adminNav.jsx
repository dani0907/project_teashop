import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function AdminNav({ navOpen, setNavOpen, isMobile }){
  let [nowNav, setNowNav] = useState(1);

  function handleNavClick(num) {
    setNowNav(num);
    if (isMobile) setNavOpen(false);
  }

  return(
    <div className={`adminNav${navOpen ? " open" : ""}`}>
      <div className="adNavInner">
        <ul className="adNavUl">
          <li className={`adNavLi ${nowNav===1 ? 'on' : ''}`} onClick={() => handleNavClick(1)}>
            <Link to='adminBoard'>Dashboard</Link>
          </li>
          <li className={`adNavLi ${nowNav===2 ? 'on' : ''}`} onClick={() => handleNavClick(2)}>
            <Link to='adminProductList'>Product</Link>
          </li>
          <li className={`adNavLi ${nowNav===3 ? 'on' : ''}`} onClick={() => handleNavClick(3)}>
            <Link to='adminUser'>User</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminNav;
