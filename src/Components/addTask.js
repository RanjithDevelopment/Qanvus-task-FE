import React, { useState, useEffect } from 'react';
import "../Css/LoginStyles.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
const AddTasks = () => {
    //to get the update details ?
    const location = useLocation();
    const editData = location.state;
    //to navigate through routes based on history
    const history = useNavigate();
    let taskValues = {
        taskTitle:"",
        description:"",
        dueDate:"",
        completed:false,
        error: {
            taskTitle:"",
            description:"",
            dueDate:"",
        }
    };
    //State Variables 
    const [taskData, setTaskData] = useState(taskValues);

    const token = localStorage.getItem("token");
    
    

    useEffect(() => {
        if (editData) {
            const updationData = {
                ...taskData,
                taskTitle: editData.taskTitle || '',
                description: editData.description || '',
                dueDate: editData.dueDate || '',
                completed: editData.completed || ''
            }
          
          setTaskData(updationData);
        }
    }, [editData])

    /// here is onchange function 
    const commonchange = (e) => {
        let error = { ...taskData.error };
        if (e.target.value === "") {

            error[e.target.name] = `${e.target.name} is Required`;
        } else {

            error[e.target.name] = "";
        }
        setTaskData({ ...taskData, [e.target.name]: e.target.value, error });

    };
    
    //Login Submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData&&editData._id) {
          axios.put(`https://digital-avenue-task-api.onrender.com/api/tasks/update/${editData._id}`,{...taskData},{
            headers:{
                accesstoken:token,
            }
          })
          .then(()=>history('/tasks'))
          .catch((error)=>alert(JSON.stringify(error)));
         setTaskData(taskValues);
        } else {
            axios.post("https://digital-avenue-task-api.onrender.com/api/tasks/add", { ...taskData },{
                headers:{
                    accesstoken:token
                }
            })
                .then((response) => {
                  alert(response.data.msg)
                  history('/tasks');
                  setTaskData(taskValues);
                })
                .catch((error) => {
                    alert(error.response.data.msg);
                });
           
        }
    };
    return (
        <>
           <Navbar/>
           <br/>
           <br/>
            <div className="page">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="cover" >
                        <h1>Add A Task Info!</h1>

                        <input placeholder="Title" name="taskTitle"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={taskData.taskTitle} />
                        <span style={{ color: "red" }}>{taskData.error.taskTitle}</span>
                        <textarea
                         placeholder='Description of the task' name='description'
                         value={taskData.description} 
                         onChange={(e)=> commonchange(e)}
                         />
                            
                        <span style={{ color: "red" }}>{taskData.error.description}</span>
                        <input
                            type='text'
                            placeholder='dd/mm/yyy'
                            name='dueDate'
                            onChange={(e) => commonchange(e)}
                            value={taskData.dueDate}

                        />
                        <span style={{ color: "red" }}>{taskData.error.dueDate}</span>
                         {editData ? 
                         
                          <div>
                                <label>Completed</label> 
                                <input
                                   type="checkbox"
                                   checked={taskData.completed}
                                   onChange={(e)=>setTaskData({...taskData,completed: e.target.checked})}
                                />

                         </div>
                                   : <></>}
                        <button className="login-btn" type='submit'>Add</button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AddTasks
