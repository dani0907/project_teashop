import { supabase } from "../supabaseClient";
import { Link, Routes, Route,useNavigate} from "react-router-dom";
import { useState } from "react";
import SignUp from "./signUp"

import "../style/login.css"


function Login(props){

  let [id, setId] = useState();
  let [pw, setPw] = useState();
  let navigate = useNavigate();
  let loginData = {};
  const loginDataFunc = props.loginDataFunc;
  const signIn = async() => {
    const { data : authData, error:authError } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw
    })
    if (authError) {
      console.error("login fail : ", authError.message);
      alert("Login failed.");
    } else {
      console.log("loginpage login success: ", authData);
      // console.log("login page user Data : ", data.user.user_metadata);
      
      const { data: dbUser, error: dbError } = await supabase
      .from('tea_cust')
      .select('*')
      .eq('id', authData.user.id) // Auth의 고유 ID와 매칭
      .single();
      if(dbError){
        console.log("selectl login Data is fail : ",dbError);
      }

      if(localStorage.getItem('loginData') == 0){
        localStorage.setItem('loginData',null);
      }
      loginData.token = authData.session.access_token;
      loginData.firstName = dbUser.first_name;
      loginData.lastName = dbUser.last_name;
      loginData.email = dbUser.email;
      loginData.adminYn = dbUser.admin_yn;
      
      localStorage.setItem('loginData', JSON.stringify(loginData));
      
      loginDataFunc();
      alert(`Welcome ${dbUser.first_name}!`);
      navigate('/');
    }
  }

  return(
    <div className="mainContainer">
      <div className='loginInner'>
        <div className="loginCon">
          <h2>Login</h2>
          <form className="loginBox" onSubmit={(e) => {
                                              e.preventDefault();
                                              signIn();}}>
            <div className="loginInputBox">
              <div className="logInputCon"><span className="logInputType">ID</span><input type="text" onChange={(e)=> {setId(e.target.value)}} required></input></div>
              <div className="logInputCon"><span className="logInputType">PW</span><input type="password" onChange={(e)=> {setPw(e.target.value)}} required></input></div>
            </div>
            <button type="submit" className="loginBtn">Login</button>
          </form>
          <Link className="registBtn" to='/signUp'>Register</Link>
        </div>

        <Routes>
          <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Login;