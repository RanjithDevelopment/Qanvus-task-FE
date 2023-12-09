import "../Css/NavbarStyles.css";
import React ,{useState}from 'react'
import { Link } from "react-router-dom";
import {FaBars,FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
function Navbar(){

  const navigate = useNavigate();
const [click,setClick]=useState(false);
const handleClick =()=>setClick(!click);
const [color,setColor]=useState(false);

const changeColor=()=>{
  if(window.scrollY >=100 ){
    setColor(true);
}else{
  setColor(false);
}
}; 
window.addEventListener("scroll",changeColor);

const handleLogout =()=>{
  localStorage.clear();
  navigate('/')
}
  return (
    <div className={color ? "header header-bg":"header" }>
      <Link to='/' >
      
      <h1 >Ranjith</h1>
      </Link>
      <ul className={click ? "nav-menu active" :"nav-menu"}>
        <li>
            <Link to='/'>Login</Link>
        </li>
        <li>
            <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
            <Link to='/addtasks'>Add Task</Link>
        </li>
        <li>
            <Link to='/tasks'>View Tasks</Link>
        </li>
        
        <li>
           <h3 style={{color:"white"}} onClick={handleLogout} >LogOut</h3>
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {
click ? ( <FaTimes size={20} style={{color:"#fff"}}/>) :(<FaBars size={20} style={{color:"#fff"}}/>)
        }
       
        
      </div>
    </div>
  )
}
  
export default Navbar
