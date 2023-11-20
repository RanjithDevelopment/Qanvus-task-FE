import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Css/table.css";
import Navbar from './Navbar';


const Table = () => {
    const token = localStorage.getItem("token")
    const [ProductDatas, setproductDatas] = useState([]);
    
    const history = useNavigate();
    useEffect(() => {
        async function getData() {
             await axios.get("https://qanvus-task-api.onrender.com/api/products/get",{
                headers:{
                    accesstoken: token,
                }
            }).then((response)=>setproductDatas(response.data))
              .catch((error)=>alert(error.response.data.msg))
            ;
        }
        getData()
    }, [])
    //to handle delete
    const handleDelete = async (id) => {
        await axios.delete(`https://qanvus-task-api.onrender.com/api/products/delete/${id}`,{
            headers:{
                accesstoken: token,
            }
        })
            .then(() => history('/products')).catch((error) => alert(JSON.stringify(error)));
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
                        <th>ProductName</th>
                        <th>Image</th> 
                        <th>quantity</th>
                        <th>Discount</th>
                        <th>Price</th>
                        
                        <th>Actions</th>
                    </tr>
                    {ProductDatas.map((data) => {

                        return (
                            <tbody key={data._id}>
                                <tr >
                                    <td>{data.productName}</td>
                                    <td>{data.image}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.discount}</td>
                                    <td>{data.price}</td>
                                    <td>
                                        <Link
                                            className='edit'
                                            to="/createproduct" state={data}  >
                                            Update Tracking
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
