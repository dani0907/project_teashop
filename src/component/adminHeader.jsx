import { Link } from "react-router-dom";

function AdminHeader({ isMobile, navOpen, setNavOpen }){
  return(
    <header id="adminHeader" className="admin">
      <div className="headerInner">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          {isMobile && (
            <button
              onClick={() => setNavOpen(prev => !prev)}
              aria-label="menu open/close"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
                padding: "4px",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className={navOpen ? "bi bi-x-lg" : "bi bi-list"} />
            </button>
          )}
          <div className="adminLogo">
            <Link to='/admin'><i className="bi bi-gear-wide-connected adminIcon"></i>Tea Admin</Link>
          </div>
        </div>

        <div className="backToShop">
          <Link to='/'>back to the shop</Link>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader;
