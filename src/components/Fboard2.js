import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const Nstyle = () => {
    return (
        <style>
            {`
             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
             .popin{
                 font-family: 'Poppins', sans-serif;
             }
                
                @media screen and (max-width:990px){
                    .bb-buttonv{
                        margin-top:15px;
                    }
                    .form-n{
                        margin:auto;
                    }
                    @media screen and (max-width:800px){
                        .div{
                            display:flex;
                            justify-content:space-between;
                        }
                    }
            `}
        </style>
    )
}

const Fboard = () => {
    const cookies = new Cookies();
    const token = cookies.get('auth_key');


    const history = useHistory()
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const handleClick = (e) => {
        e.preventDefault()

        axios({
            method: 'get',
            headers: { auth: `bearer ${token}` },
            url: `https://pkbfertilizer.herokuapp.com/api/v1//product?name=${text}`,
        })
            .then((resp) => {
                dispatch({ type: 'products', data: resp.data })
                history.push("/login")

            })
    }
    const logout = () => {
        axios({
            method: 'get',
            headers: { auth: `bearer ${token}` },
            url: 'https://pkbfertilizer.herokuapp.com/api/v1/logout',
        }).then((res) => {
            console.log(res)
            if (res.data.status == 'success') {

                cookies.set('auth_key', '');
                toast.success('Logged Out')
                history.push("/login")
            }
        })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light popin">
                <div class="container-fluid d-flex justify-content-between">
                    <a class="" href="/">
                        <img src="/images/fz3.png" alt="" width="42" height="42" />
                    </a>
                            <button class="btn btn-success ms-3 bb-buttonv" onClick={logout} type="submit">Logout</button>
                    {/* <div class="navbar-collapse" id="navbarSupportedContent">

                        <div className="div">
                            <button class="btn text-success bb-buttonv" type="submit">
                                <a href="/users/add" className="btn text-success bb-buttonv">Create Item</a></button>
                        </div>
                    </div> */}
                </div>
            </nav>
            <Nstyle />
        </div>
    )
}

export default Fboard