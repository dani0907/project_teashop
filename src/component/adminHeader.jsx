import { Link } from "react-router-dom";

function AdminHeader(){
  return(
    <header id="adminHeader" className="admin">
      <div className="headerInner">
        <div className="adminLogo">
          <Link to='/admin'><i class="bi bi-gear-wide-connected adminIcon"></i>Tea Admin</Link>
        </div>
        <div className="backToShop">
          <Link to='/'>back to the shop</Link>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader;