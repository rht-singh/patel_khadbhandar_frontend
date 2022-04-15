import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'

import { toast } from 'react-toastify'

const Addstyle = () => {
    return (
        <style>
            {`
            .container-add{
                width:40%;
            }
            @media screen and (max-width:700px){
                .container-add{
                    width:95%;
                }
            }

            `}
        </style>
    )
}


const AddProduct = () => {
    const history = useHistory()
    const cookies =  new Cookies();
    const token = cookies.get('auth_key');


    const [Product, setProduct] = useState({
        "product_name": "",
        "img_url": "",
        "brand_name": "",
        "quantity": 0
    })

    const inputChnage = (e) => {
        setProduct({ ...Product, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {

        e.preventDefault()
        console.log(Product)
        axios({
            method: 'post',
            headers:{auth:`bearer ${token}`},
            url: 'https://pkbfertilizer.herokuapp.com/api/v1/product',
            data: Product
        }).then((res) => console.log(res))
        .catch(err => console.log(err))

        toast.success('Product Added')
        history.push("/")
    }
    return (
        <>
            <div className='container-add m-auto shadow-light my-5 shadow px-4 py-5 rounded'>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="in1" name='product_name'  required onChange={e => inputChnage(e)} placeholder="Product Name" />
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" id="in2" name='quantity' required onChange={e => inputChnage(e)} placeholder="Quantity" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="in3" name='img_url' required onChange={e => inputChnage(e)} placeholder="Img_URL" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="in5" name='brand_name' required onChange={e => inputChnage(e)} placeholder="Enter your Brand name" />
                    </div>
                    <div className="div w-100">
                        <button className="btn btn-success w-100">Add Item</button>
                    </div>

                </form>

            </div>
            <Addstyle />
        </>
    )
}

export default AddProduct