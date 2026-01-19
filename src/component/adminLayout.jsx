import { Outlet } from "react-router-dom";
import AdminHeader from "./adminHeader";
import AdminNav from "./adminNav";

import '../style/adminMain.css';


function AdminLayout(){
  return(
    <>
    <AdminHeader></AdminHeader>
    <div className="adminMain">
      <AdminNav></AdminNav>
      <div className="adminContent">
        <Outlet></Outlet>
      </div>
    </div>
    </>
  )
}

export default AdminLayout;