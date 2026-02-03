import { supabase } from "../supabaseClient";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Header({loginData,logoutFunc}){
  let navigate = useNavigate()
  let loginName;
  let myPage = "/login";

  if(loginData != null){
    loginName = loginData.firstName + " " + loginData.lastName;
    // console.log("header props : ", props);
    console.log("header loginData : ",loginData);
    myPage="/order";
    console.log("adminYn :: ",loginData.adminYn);
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

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const setSearchClick = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/allproduct?search=${searchTerm}`);
    } else {
      navigate('/allproduct');
    }
  };

  return(
    <header id='header' className={`${isScrolled ? 'on' : ''}`}>
      <div className='headerInner'>
        <div id='logo'>
          {/* <a href="" ><img src="../public/image/davidtea_logo.svg" alt=""/></a> */}
          {/* <a href="/">Tea Shop</a> */}
          <Link to="/">Tea Selection</Link>
        </div>
        <nav id="gnb">
          <ul className="gnbList">
            <li>
              <Link to="/allproduct" className='depth01'>Holiday<i class="bi bi-chevron-down"></i></Link>
              {/* <div className='headDetail'>
                <div className='hDetailList'>
                  <h3>holiday collection</h3>
                  <ul className='depth02'>
                    <li><a href="#">Discover Holiday Gift Guide</a></li>
                    <li><a href="#">Tea Wheels&Samplers</a></li>
                    <li><a href="#">Stocking Stuffers</a></li>
                    <li><a href="#">New Holiday Teas</a></li>
                    <li><a href="#">Mug Market</a></li>
                    <li><a href="#">Advent Calendars</a></li>
                    <li><a href="#">Candy Cane Teas</a></li>
                    <li><a href="#">Bundles</a></li>
                  </ul>
                </div>
                <div className='hDetailList'>
                  <h3>gifts by tea lover</h3>
                  <ul className='depth02'>
                    <li><a href="#">For Matcha Lovers</a></li>
                    <li><a href="#">For Earl Grey Lovers</a></li>
                    <li><a href="#">For Green Tea Lovers</a></li>
                    <li><a href="#">For Caffeine-Free Lovers</a></li>
                  </ul>
                </div>
                <div className='hDetailList'>
                  <h3>gifts by price</h3>
                  <ul className='depth02'>
                    <li><a href="#">Under $20</a></li>
                    <li><a href="#">Under $50</a></li>
                    <li><a href="#">Under $80</a></li>
                  </ul>
                </div>
              </div> */}
            </li>
            <li><Link to="/allproduct" className='depth01'>Tea<i class="bi bi-chevron-down"></i></Link></li>
            {/* <li><a href="#" className='depth01'>Matcha Shop<i class="bi bi-chevron-down"></i></a></li>
            <li><a href="#" className='depth01'>Shop By<i class="bi bi-chevron-down"></i></a></li>
            <li><a href="#" className='depth01'>Teaware<i class="bi bi-chevron-down"></i></a></li>
            <li><a href="#" className='depth01'>Recipes<i class="bi bi-chevron-down"></i></a></li> */}
          </ul>
        </nav>
        <div id='headIcons'>
          {
            loginData != null ? <div><span className="loginNm">{`welcome ${loginName}!`}</span><button className="logoutBtn" onClick={()=>{logoutFunc()}}>logout</button></div> : null
          }
          {
            loginData?.adminYn === "Y" ? <div className="adminPgBtn"><Link to="/admin"><i class="bi bi-gear-wide-connected"></i></Link></div> : null
          }
          <div id='searchBox'><input type="text" className="serchInput"onChange={(e)=>setSearchTerm(e.target.value)}/><button onClick={setSearchClick} className="searchBtn"><i class="bi bi-search"></i></button></div>
          <div id='loginBtn'><Link to={myPage}><i class="bi bi-person"></i></Link></div>
          <div id='cartBtn'><Link to="/cart"><i class="bi bi-cart2"></i></Link></div>
        </div>
      </div>
      
    </header>
  )
}

export default Header;