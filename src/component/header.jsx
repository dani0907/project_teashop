import { supabase } from "../supabaseClient";
import { Routes, Route, Link, useNavigate, Outlet, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react'

function Header({loginData,logoutFunc}){
  let navigate = useNavigate();
  let location = useLocation();
  let loginName;
  let myPage = "/login";

  if(loginData != null){
    loginName = loginData.firstName + " " + loginData.lastName;
    myPage="/order";
  }

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // 데스크탑으로 커지면 닫기
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // close the menu
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // lock the scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // serach
  const [searchTerm, setSearchTerm] = useState("");
  const setSearchClick = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/allproduct?search=${searchTerm}`);
    } else {
      navigate('/allproduct');
    }
  };

  return (
    <>
      <header id='header' className={`${isScrolled ? 'on' : ''}`}>
        <div className='headerInner'>

          {/* logo */}
          <div id='logo'>
            <Link to="/">Tea Selection</Link>
          </div>

          {/* GNB - only for Desktop */}
          {!isMobile && (
            <nav id="gnb">
              <ul className="gnbList">
                <li>
                  <Link to="/allproduct" className='depth01'>
                    Holiday<i className="bi bi-chevron-down"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/allproduct" className='depth01'>
                    Tea<i className="bi bi-chevron-down"></i>
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* header right */}
          <div id='headIcons'>
            {loginData != null && (
              <div>
                <span className="loginNm">{`welcome ${loginName}!`}</span>
                <button className="logoutBtn" onClick={logoutFunc}>logout</button>
              </div>
            )}
            {loginData?.adminYn === "Y" && (
              <div className="adminPgBtn">
                <Link to="/admin"><i className="bi bi-gear-wide-connected"></i></Link>
              </div>
            )}
            {/* serach */}
            {!isMobile && (
              <div id='searchBox'>
                <input
                  type="text"
                  className="serchInput"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setSearchClick(e)}
                />
                <button onClick={setSearchClick} className="searchBtn">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            )}
            <div id='loginBtn'><Link to={myPage}><i className="bi bi-person"></i></Link></div>
            <div id='cartBtn'><Link to="/cart"><i className="bi bi-cart2"></i></Link></div>

            {/* button - only in mobile */}
            {isMobile && (
              <button
                className="hamburgerBtn"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="메뉴 열기/닫기"
              >
                <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"} />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ===== 모바일 드로어 메뉴 ===== */}
      {isMobile && (
        <>
          {/* 오버레이 */}
          {menuOpen && (
            <div className="mobileMenuOverlay" onClick={() => setMenuOpen(false)} />
          )}

          {/* 슬라이드 메뉴 */}
          <div className={`mobileMenu${menuOpen ? ' open' : ''}`}>
            {/* 검색창 */}
            <div className="mobileSearchBox">
              <input
                type="text"
                className="mobileSearchInput"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setSearchClick(e)}
              />
              <button onClick={setSearchClick} className="searchBtn">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* 메뉴 링크 */}
            <ul className="mobileMenuList">
              <li><Link to="/allproduct">Holiday</Link></li>
              <li><Link to="/allproduct">Tea</Link></li>
              <li><Link to={myPage}>{loginData ? 'My Page' : 'Login'}</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              {loginData?.adminYn === "Y" && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              {loginData && (
                <li>
                  <button className="mobileLogoutBtn" onClick={() => { logoutFunc(); setMenuOpen(false); }}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Header;