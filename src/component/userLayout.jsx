import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

import '../style/clear.css';
import '../style/layout.css';
import '../style/main.css';

function UserLayout({loginData, logoutFunc}){
  // console.log("userLayout loginData :::" + props.loginData);
  // console.log("userLayout logoutFunc :::" + props.logoutFunc);
  return (
    <>
    <Header loginData={loginData} logoutFunc={logoutFunc} ></Header>
    <div id="main">
      <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </>
  )
}

export default UserLayout;