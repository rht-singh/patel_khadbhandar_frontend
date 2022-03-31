import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import Cookies from 'universal-cookie'

import { toast } from 'react-toastify'

const Estyle = ()=>{
    return (
        <style>
            {`
            .container-edit{
                width:40%;
            }
            @media screen and (max-width:700px){
                .container-edit{
                    width:95%;
                }
            }

            `}
        </style>
    )
}

const Edit = () => {
    const cookies =  new Cookies();
    const token = cookies.get('auth_key');
    const product_id = useParams().id
    const [data,setData] = useState({})
    const history = useHistory()
    const [Product, setProduct] = useState({
        "id": product_id,
        "product_name":undefined,
        "sold":0,
        "quantity":0,   
        "brand_name":undefined,
        "img_url":undefined
    })
    useEffect(()=>{
        axios({
            method: 'get',

            headers:{auth:`bearer ${token}`},
            url: `https://ferltilizer.herokuapp.com/api/v1/product_detail/${product_id}`,
            // data: Product
        }).then((res)=>{
            setData(res.data.data[0])
        })
        .catch(err=>console.log(err))
    },[])
    const inputChnage = (e)=>{
        console.log('slkdhf')
        setProduct({...Product, [e.target.name]:e.target.value})
    }
    
    const onSubmit = async (e)=>{
        e.preventDefault()
        console.log(Product)
        
        axios({
            method: 'put',

            headers:{auth:`bearer ${token}`},
            url: 'https://ferltilizer.herokuapp.com/api/v1/update_product',
            data: Product
        }).then((res)=>console.log(res))
        .catch(err=>console.log(err))

        toast.success('Product Edited ')
        history.push("/")
    }


  return (
    <div className='container-edit m-auto shadow-light  shadow px-4 py-5 rounded'>
        <form onSubmit={e=> onSubmit(e)}>
        <div className="mb-3">
        <input type="text" className="form-control" id="in1" value={data.product_name} name='product_name' onChange={e=> inputChnage(e)} placeholder="Product Name"/>
        </div>
        <div className="mb-3">
        <input type="number" className="form-control" id="in2" value={data.quantity} name='quantity' onChange={e=> inputChnage(e)} placeholder="Quantity"/>
        </div>
        <div className="mb-3">
        <input type="number" className="form-control" id="in3" value={data.sold} name='sold'  onChange={e=>inputChnage(e)} placeholder="Sold"/>
        </div>
        <div className="mb-3">
        <input type="text" className="form-control" id="in4" value={data.img_url} name='img_url'  onChange={e=> inputChnage(e)} placeholder="Image URL"/>
        </div>
        <div className="mb-3">
        <input type="text" className="form-control" id="in5" value={data.brand_name} name='brand_name' onChange={e=> inputChnage(e)} placeholder="Enter your Brand name"/>
        </div>
        <div className="div w-100">  
            <button className="btn btn-success w-100">Update Item</button>
        </div>
        
        </form>



        <Estyle/>
    </div>
  )
}

export default Edit