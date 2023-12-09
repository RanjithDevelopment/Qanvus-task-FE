import React from "react";
import {Route,Routes} from 'react-router-dom';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import AddTasks from './Components/addTask.js';
import Table from "./Components/Table.js";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}  />
      <Route path='/signup' element = {<Signup/>} />
      <Route path='/addtasks' element = {<AddTasks/>}/>
      <Route path="/tasks" element={<Table/>}/>
     
    </Routes>
    
    </>
  );
}

export default App;
