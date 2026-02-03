import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

function SignUp(){

  let [email, setEmail] = useState();
  let [pw,setPw] = useState();
  let [confirmPw,setConfirmPw] = useState();
  let [phone,setPhone] = useState();
  let [address, setAddress] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();

  let navigate = useNavigate();


  async function signUpEvent(){

    if(await userDataValidate(email,pw,confirmPw,firstName,lastName)){
      signUp();
    }
  };

  async function userDataValidate(iemail,ipw,iconfirmPw,ifirstNm,ilastNm){
    const isTaken = await takenEmail(iemail);
    console.log("isTaken",isTaken);
    if(!validateEmail(iemail)){
      alert("check your email format");
      return false;
    } else if(isTaken){
      console.log("isTaken",isTaken);
      alert("This email is already taken");
      return false;
    } else if(ipw != iconfirmPw){
      alert("Check your password again.");
      return false;
    } else if(!validatePassword(ipw)){
      alert("Password must contain Letters, Numbers, A character that is neither a letter nor a number and at least 6 characters.");
      return false;
    }  else if(ifirstNm.length < 2 || ilastNm.length < 2){
      alert("first and last name must be at least 2 characters long");
      return false;
    } 
    return true;
  };

  const takenEmail = async(iemail) => {
    console.log("takenEmail inside",iemail);
    const {count : userCount , error:userCountError } = await supabase.from('tea_cust')
    .select('*', { count: 'exact', head: true })
    .eq('email', iemail)

    if (userCountError) {
      console.error('userCountError:', userCountError.message);
      return false;
    } else {
      console.log("userCount",userCount);
    }

    // if count is bigger than 0, this email is already taken.
    return userCount > 0;
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); 
  };
  function validatePassword(pw){
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/;
    return pwRegex.test(pw);
  };

  function handlePhoneNum(e){
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    let result = "";

    if (value.length < 4) {
      result = value;
    } else if (value.length < 7) {
      result = value.substr(0, 3) + "-" + value.substr(3);
    } else if (value.length < 11) {
      result = value.substr(0, 3) + "-" + value.substr(3, 3) + "-" + value.substr(6);
    } else {

      result = value.substr(0, 3) + "-" + value.substr(3, 4) + "-" + value.substr(7);
    }
    setPhone(result); 
    console.log("phone",phone);
  }

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
          <form className="signUpBox" onSubmit={(e) => {
                                              e.preventDefault();
                                              signUpEvent();}}>
            <div className="signInputBox">
              <label><span className="signUpType">E-mail</span><input className="signUpInput" type="text" placeholder="put your e-mail" onChange={(e)=> {setEmail(e.target.value)}} required></input></label>
              {/* <label><span>ID</span><input type="text" placeholder="put your id" onChange={(e)=> {setId(e.target.value)}}></input></label> */}
              <label><span className="signUpType">Password</span><input className="signUpInput" type="password" placeholder="put your password" onChange={(e)=> {setPw(e.target.value)}} required></input></label>
              <label><span className="signUpType">Confirm Password</span><input className="signUpInput" type="password" placeholder="confirm your password" onChange={(e)=> {setConfirmPw(e.target.value)}} required></input></label>
              <label><span className="signUpType">First Name</span><input className="signUpInput" type="text" placeholder="put your first name" onChange={(e)=> {setFirstName(e.target.value)}} required></input></label>
              <label><span className="signUpType">Last Name</span><input className="signUpInput" type="text" placeholder="put your last name" onChange={(e)=> {setLastName(e.target.value)}} required></input></label>
              <label><span className="signUpType">Phone Num</span><input className="signUpInput" type="tel" placeholder="put your number" onChange={handlePhoneNum} value={phone} required></input></label>          
              <label><span className="signUpType">Address</span><input className="signUpInput" type="text" placeholder="put your address" onChange={(e)=> {setAddress(e.target.value)}} required></input></label>          
            </div>
            <button type="submit" className="registerBtn">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;