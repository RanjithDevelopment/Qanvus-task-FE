import React from "react";
import {Route,Routes} from 'react-router-dom';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import AddProducts from './Components/addProducts.js';
import Table from "./Components/Table.js";
import ChangePassword from "./Components/changePassword.js";
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}  />
      <Route path='/signup' element = {<Signup/>} />
      <Route path='/createproduct' element = {<AddProducts/>}/>
      <Route path="/products" element={<Table/>}/>
      <Route path="/changePassword" element={<ChangePassword/>}/>
    </Routes>
    
    </>
  );
}

export default App;
