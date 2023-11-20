import React ,{useState} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom';
import "../Css/LoginStyles.css";
import Navbar from './Navbar';
const ChangePassword = () => {
    const navigate =useNavigate();
    const[chageData , setChangeData] = useState({
        oldpassWord:"",
        newpassword:"",
        confirmNewPassword:"",
        error:{
            oldpassWord:"",
            newpassword:"",
            confirmNewPassword:"",
        }
    }) 
     /// here is onchange function 
  const commonchange = (e) => {
    let error = { ...chageData.error };
    if (e.target.value === "") {

      error[e.target.name] = `${e.target.name} is Required`;
    } else {

      error[e.target.name] = "";
    }
    
   setChangeData({ ...chageData, [e.target.name]: e.target.value, error });

  };
  const token = localStorage.getItem("token");

  const handlesubmit = async(e)=>{
     e.preventDefault();
     axios.post("https://qanvus-task-api.onrender.com/api/user/changepassword",{...chageData},{
        headers:{
            accesstoken:token
        }
     }).then((response)=> {
        alert(response.data.msg);
        navigate('/products')
    }).catch((error)=>{
       alert(error.response.data.msg);
       navigate('/')
    })
  }

  return (
    <>
    
    <Navbar/>
      <div className="page">

        <div className="cover" >
          <h1 >Change Your Password Here</h1>
         
          <input placeholder="Old Password" name="oldpassWord"
            type="oldpassWord"
            onChange={(e) => commonchange(e)}
            value={chageData.oldpassWord} 
            />
            
             <span style={{ color: "red" }}>{chageData.error.oldpassWord}</span> 
        
            <input type="password" placeholder="newpassword" 
             name="newpassword"
            onChange={(e) => commonchange(e)}
            value={chageData.newpassword} />
            <span style={{ color: "red" }}>{chageData.error.newpassword}</span> 
            
            <input type="text" placeholder="confirmNewPassword" 
             name="confirmNewPassword"
            onChange={(e) => commonchange(e)}
            value={chageData.confirmNewPassword} />
            <span style={{ color: "red" }}>{chageData.error.confirmNewPassword}</span> 
      
        <button className="login-btn" onClick={(e)=>handlesubmit(e)}>Change</button>
      
          <p className="text">Or SignUp</p>

          <div className="alt-login">
            <div className="signup"><Link to="/signup" className="signup">SignUp</Link></div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ChangePassword
