import React, { useState } from "react";
import "../Css/LoginStyles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  let loginvalues = {
    email: "",
    password: "",
    error: {
      email: "",
      password: ""

    }
  };
  //State Variables 
  
  const [Logindata, setlogindata] = useState(loginvalues);
  
  /// here is onchange function 
  const commonchange = (e) => {
    let error = { ...Logindata.error };
    if (e.target.value === "") {

      error[e.target.name] = `${e.target.name} is Required`;
    } else {

      error[e.target.name] = "";
    }
    setlogindata({ ...Logindata, [e.target.name]: e.target.value, error });

  };
  //Login Submission 
  const handlesumit =async () => {
   await axios.post("https://digital-avenue-task-api.onrender.com/api/user/signin",{...Logindata})
  .then((response)=>{
    localStorage.setItem("token",response.data);

const token = localStorage.getItem("token");

const existuser = jwtDecode(token);
 
navigate('/tasks' ) 
  })
  .catch((error)=>{
    alert(error.response.data.msg)
    navigate('/signup')
  })

};
  return (
    <>
         
           <Navbar/>
         <br/>
      <div className="page">

        <div className="cover" >
          <h1 >Welcome to  Login</h1>
<p className="text">If You Are An Admin It will Redirect To The DashBoard </p>
          <input placeholder="Sample@gmail.com" name="email"
            type="email"
            onChange={(e) => commonchange(e)}
            value={Logindata.email} />
             <span style={{ color: "red" }}>{Logindata.error.email}</span> 
          <input type="password" placeholder="password" 
             name="password"
            onChange={(e) => commonchange(e)}
            value={Logindata.password} />
            <span style={{ color: "red" }}>{Logindata.error.password}</span> 
          <button className="login-btn" onClick={handlesumit}>Login</button>
          <p className="text">Or SignUp</p>

          <div className="alt-login">
            <div className="signup"><Link to="/signup" className="signup">SignUp</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
