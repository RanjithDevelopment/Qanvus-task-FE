import React, { useState } from 'react';
import "../Css/LoginStyles.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import axios from "axios";
const Signup = () => {
    const navigate = useNavigate();
    let signupValues = {
        name: "",
        email: "",
        phoneNo: "",
        dateOfBirth: "",
        password: "",
        confrimPassword: "",

        error: {
            name: "",
            email: "",
            phoneNo: "",
            dateOfBirth: "",
            password: "",
            confrimPassword: "",
        }
    };
    //State Variables 

    const [formdata, setformdata] = useState(signupValues);

    /// here is onchange function 
    const commonchange = (e) => {
        let error = { ...formdata.error };
        if (e.target.value === "") {

            error[e.target.name] = `${e.target.name} is Required`;
        } else {

            error[e.target.name] = "";
        }
        // Adding email and phone number validation
        if (e.target.name === 'email') {
            if (!validateEmail(e.target.value)) {
                error[e.target.name] = 'Invalid email address'
            }
        }

        if (e.target.name === 'PhoneNo') {
         
            if (!validatePhone(e.target.value)) {
                error[e.target.name] = 'Invalid phone number'
            }
        }
        setformdata({ ...formdata, [e.target.name]: e.target.value, error });

    };
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function validatePhone(phone) {
        if (phone.length < 10 || phone.length > 10) return false
        return true
    }
    //Login Submission 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = axios.post("https://qanvus-task-api.onrender.com/api/user/signup", { ...formdata })
            .then((response) => {
                if (response.status === 200) {
                    // Handle successful response
                    alert(response.data);
                    navigate('/');
                    setformdata(formdata);
                } else {
                    // Handle error response
                    alert(response.status);
                  
                }
            })
            .catch((error) => {
                alert(error);
                navigate('/signup')
            });



       
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="page">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="cover" >
                        <h1>SignUp Here !</h1>

                        <input placeholder="Name" name="name"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={formdata.name} />
                        <span style={{ color: "red" }}>{formdata.error.name}</span>
                        <input placeholder="Sample@gmail.com" name="email"
                            type="email"
                            onChange={(e) => commonchange(e)}
                            value={formdata.email} />
                        <span style={{ color: "red" }}>{formdata.error.email}</span>
                        <input placeholder="Phone No" name="phoneNo"
                            type="number"
                            onChange={(e) => commonchange(e)}
                            value={formdata.phoneNo} />
                        <span style={{ color: "red" }}>{formdata.error.phoneNo}</span>
                        <input
                            type='text'
                            placeholder='dd/mm/yyy'
                            name='dateOfBirth'
                            onChange={(e) => commonchange(e)}
                            value={formdata.dateOfBirth}

                        />
                        <span style={{ color: "red" }}>{formdata.error.dateOfBirth}</span>
                        <input type="password" placeholder="password"
                            name="password"
                            onChange={(e) => commonchange(e)}
                            value={formdata.password} />
                        <span style={{ color: "red" }}>{formdata.error.password}</span>
                        <input placeholder="confrim Password" name="confrimPassword"
                            type="password"
                            onChange={(e) => commonchange(e)}
                            value={formdata.confrimPassword} />
                        <span style={{ color: "red" }}>{formdata.error.confrimPassword}</span>
                        <button className="login-btn" type='submit'>Register</button>
                        <p className="text">already a registered user?</p>

                        <div className="alt-login">
                            <div className="signup"><Link to="/login" className="signup">Login</Link></div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Signup
