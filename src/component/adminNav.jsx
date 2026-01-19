import { useState } from "react";
import { Link,useLocation } from "react-router-dom";

function AdminNav(){
  let [nowNav,setNowNav] = useState(1);
  console.log("nowNav : ",nowNav);
  return(
    <div className="adminNav">
      <div className="adNavInner">
        <ul className="adNavUl">
          <li className={`adNavLi ${nowNav===1 ? 'on' : ''}`} onClick={()=>{setNowNav(1)}}><Link to='adminBoard'>Dashboard</Link></li>
          <li className={`adNavLi ${nowNav===2 ? 'on' : ''}`} onClick={()=>{setNowNav(2)}}><Link to='adminProductList'>Product</Link></li>
          <li className={`adNavLi ${nowNav===3 ? 'on' : ''}`} onClick={()=>{setNowNav(3)}}><Link to='adminUser'>User</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default AdminNav;