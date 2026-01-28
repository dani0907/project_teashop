import { supabase } from '../supabaseClient';
import { useState,useEffect } from 'react';

function UserList({userData}){
  return(
  <>
  {
    userData.map((item,index) => (
      <div className="userDataBox">
        <div className='boxLeft'>
          <i class="bi bi-person-circle userIcon"></i>
        </div>
        <div className="boxRight">
          <div className='boxRTop'>
            <p className='userName'>{`${item.first_name} ${item.last_name}`}</p>
          </div>
          <div className='boxRMiddle'>
            <span className='userEmail'>{item.email}</span>
            <span className='userPhone'>{item.phone_num}</span>
            <span className='AdminYn'>{`Admin : ${item.admin_yn}`}</span>
          </div>
          <div className="boxRBottom">
            <p>{item.address}</p>
          </div>
        </div>
      </div>
    ))
    }
  </>
  )
}
function AdminUser(){
  const [userData,setUserData] = useState([]);
  useEffect(() => {
    async function userListSelect() {
      const { data : userData, error : userError } = await supabase.from("tea_cust")
      .select(`email
              ,first_name
              ,last_name
              ,phone_num
              ,address
              ,admin_yn
            `)
        .order('created_at', { ascending: false });

      if (userError) {
        console.error("Supabase connect fail:", userError);
      } else {
        console.log("Supabase connect success:", userData);
        setUserData(userData);
      }
    }

    userListSelect();
  }, []);
  return(
    <div className="innerContainer admin adminUser">
      <h2 className="adminTitle">Admin User</h2>
      <div className="userListCon">
        <UserList userData={userData} ></UserList>
      </div>
    </div>
  )
}

export default AdminUser;