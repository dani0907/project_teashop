import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./adminHeader";
import AdminNav from "./adminNav";
import '../style/adminMain.css';

function AdminLayout(){
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setNavOpen(false); // 데스크탑으로 커지면 닫기
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  return(
    <>
      <AdminHeader 
        isMobile={isMobile} 
        navOpen={navOpen} 
        setNavOpen={setNavOpen} 
      />

      {isMobile && navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            top: "60px",
            background: "rgba(0,0,0,0.45)",
            zIndex: 48,
          }}
        />
      )}

      <div className="adminMain">
        <AdminNav 
          navOpen={navOpen} 
          setNavOpen={setNavOpen}
          isMobile={isMobile}
        />
        <div className="adminContent">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout;
