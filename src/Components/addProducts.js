import React, { useState, useEffect } from 'react';
import "../Css/LoginStyles.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
const AddProducts = () => {
    //to get the update details ?
    const location = useLocation();
    const editData = location.state;
    //to navigate through routes based on history
    const history = useNavigate();
    let productValues = {
        productName: "",
        quantity: "",
        price: "",
        discount: "",
        image: "",
        error: {
            productName: "",
            quantity: "",
            price: "",
            discount: "",
            image: "",
        }
    };
    //State Variables 
    const [productData, setproductData] = useState(productValues);

    const token = localStorage.getItem("token");
    
    

    useEffect(() => {
        if (editData) {
            const updationData = {
                ...productData,
                productName : editData.productName || '',
                image: editData.image || '',
                quantity: editData.quantity || '',
                discount: editData.discount || '',
                price: editData.price || '',
            }
           setproductData(updationData);
        }
    }, [editData])

    /// here is onchange function 
    const commonchange = (e) => {
        let error = { ...productData.error };
        if (e.target.value === "") {

            error[e.target.name] = `${e.target.name} is Required`;
        } else {

            error[e.target.name] = "";
        }
        setproductData({ ...productData, [e.target.name]: e.target.value, error });

    };
    //Login Submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData&&editData._id) {
          axios.put(`https://qanvus-task-api.onrender.com/api/products/update/${editData._id}`,{...productData},{
            headers:{
                accesstoken:token,
            }
          })
          .then(()=>history('/products'))
          .catch((error)=>alert(JSON.stringify(error)));
         setproductData(productValues);
        } else {
            axios.post("https://qanvus-task-api.onrender.com/api/products/add", { ...productData },{
                headers:{
                    accesstoken:token
                }
            })
                .then((response) => {
                  alert(response.data.msg)
                  history('/products');
                })
                .catch((error) => {
                    alert(error.response.data.msg);
                });
           setproductData(productValues);
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
                        <h1>Add A Product Info!</h1>

                        <input placeholder="productName" name="productName"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={productData.productName} />
                        <span style={{ color: "red" }}>{productData.error.productName}</span>
                        <input placeholder="Image Src" name="image"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={productData.image} />
                        <span style={{ color: "red" }}>{productData.error.image}</span>
                        <input placeholder="quantity" name="quantity"
                            type="number"
                            onChange={(e) => commonchange(e)}
                            value={productData.quantity} />
                        <span style={{ color: "red" }}>{productData.error.quantity}</span>

                        <select
                            name="discount"
                            onChange={(e) => commonchange(e)}
                            value={productData.discount}
                        >
                            <option value="">Select discount type</option>
                            <option value="Flat">Flat</option>
                            <option value="Percentage">Percentage</option>
                        </select>
                        <span style={{ color: "red" }}>{productData.error.discount}</span>
                        <input placeholder="price" name="price"
                            type="number"
                            onChange={(e) => commonchange(e)}
                            value={productData.price} />
                        <span style={{ color: "red" }}>{productData.error.price}</span>

                        <button className="login-btn" type='submit'>Add</button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProducts
