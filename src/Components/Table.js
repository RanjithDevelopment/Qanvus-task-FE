import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Css/table.css";
import Navbar from './Navbar';


const Table = () => {
    const token = localStorage.getItem("token")
    const [tasksDatas, settasksDatas] = useState([]);
    
    const history = useNavigate();
    useEffect(() => {
        async function getData() {
             await axios.get("https://digital-avenue-task-api.onrender.com/api/tasks/get",{
                headers:{
                    accesstoken: token,
                }
            }).then((response)=>settasksDatas(response.data))
              .catch((error)=>alert(error.response.data.msg))
            ;
        }
       console.log(tasksDatas);

        getData()
    }, [])
    //to handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://digital-avenue-task-api.onrender.com/api/tasks/delete/${id}`,{
                headers:{
                    accesstoken: token,
                }
            })
                .then(() => window.location.reload()).catch((error) => alert(JSON.stringify(error)));
        } catch (error) {
            alert(error.response.data.msg)
            
        }
       
    }
   
    return (
        <>
            <Navbar/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className='tableContainer'>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Tile</th>
                        <th>Description</th> 
                        <th>dueDate</th>
                        <th>CreatedAt</th>
                        <th>UpdatedAt</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                    {tasksDatas.map((data) => {

                        return (
                            <tbody key={data._id}>
                                <tr >
                                    <td>{data._id}</td>
                                    <td>{data.taskTitle}</td>
                                    <td>{data.description}</td>
                                    <td>{data.dueDate}</td>
                                    <td>{data.createdAt}</td>
                                    <td>{data.updatedAt?data.updatedAt:" "}</td>
                                    <td>{data.completed?"true":"false"}</td>
                                    <td>
                                        <Link
                                            className='edit'
                                            to="/addtasks" state={data}  >
                                            Update Task
                                        </Link>
                                        <Link
                                            className='delete'
                                            onClick={() => handleDelete(data._id)} >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            </div>
        </>
    )
}

export default Table
