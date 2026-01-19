import { supabase } from "../supabaseClient";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

function SignUp(){

  let [email, setEmail] = useState();
  let [pw,setPw] = useState();
  let [phone,setPhone] = useState();
  let [address, setAddress] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();

  let navigate = useNavigate();

  const signUp = async() => {
    console.log("supabase객체:", supabase);
    console.log('signUp Function call');
    console.log(`email : ${email}, password : ${pw}, first_name : ${firstName}, last_name : ${lastName}, address : ${address}, phone : ${phone}`);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pw,
      options:{
        data:{
          first_name : firstName,
          last_name : lastName,
          address : address,
          phone_num : phone,
          admin_yn :'N'
        }
      }
    })
    if (error) {
      console.error("join fail : ", error.message);
    } else {
      console.log("join success: ", data);
      alert("Welcome! Your registration is complete.");
      navigate('/login');
    }
  }
  
  return(
    <div className="mainContainer">
      <div className="signUpInner">
        <div className="signUpCon">
          <h2>Sign Up</h2>
          <div className="signUpBox">
            <div className="signInputBox">
              <label><span className="signUpType">E-mail</span><input className="signUpInput" type="text" placeholder="put your e-mail" onChange={(e)=> {setEmail(e.target.value)}}></input></label>
              {/* <label><span>ID</span><input type="text" placeholder="put your id" onChange={(e)=> {setId(e.target.value)}}></input></label> */}
              <label><span className="signUpType">PW</span><input className="signUpInput" type="text" placeholder="put your password" onChange={(e)=> {setPw(e.target.value)}}></input></label>
              <label><span className="signUpType">First Name</span><input className="signUpInput" type="text" placeholder="put your first name" onChange={(e)=> {setFirstName(e.target.value)}}></input></label>
              <label><span className="signUpType">Last Name</span><input className="signUpInput" type="text" placeholder="put your last name" onChange={(e)=> {setLastName(e.target.value)}}></input></label>
              <label><span className="signUpType">Phone Num</span><input className="signUpInput" type="text" placeholder="put your number" onChange={(e)=> {setPhone(e.target.value)}}></input></label>          
              <label><span className="signUpType">Address</span><input className="signUpInput" type="text" placeholder="put your address" onChange={(e)=> {setAddress(e.target.value)}}></input></label>          
            </div>
            <button className="registerBtn" onClick={()=> signUp()}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;