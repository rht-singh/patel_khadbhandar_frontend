import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';

const Nstyle = () => {
    return (
        <style>
            {`
             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
             .popin{
                 font-family: 'Poppins', sans-serif;
             }
             .colr{
                background-color: rgba(52, 197, 52, 0.767);
                }
                @media screen and (max-width:780px){
                    .dis-show{
                        display:none !important;
                    }
                    .bb-buttonv{

                        margin-top:10px;
                    }
                    .form-n{
                        margin:auto;
                        display:none;
                    }
                    
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
                history.push("/")

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

                toast.success('Logged Out')
                cookies.set('auth_key', '');
                history.push("/login")
            }
        })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <ToastContainer />
            <nav className="navbar navbar-expand-lg navbar-light popin">
                <div className="container-fluid">
                    <a className="navbar-brand form-n" href="/">
                        <img src="./images/fz3.png" alt="" width="42" height="42" />
                    </a>
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex m-auto dis-show">
                            <input className="form-control me-2" type="search" value={text} onChange={e => setText(e.target.value)} placeholder="Search" aria-label="Search" />
                            <button onClick={handleClick} className="btn text-white border colr" type="submit">Search</button>
                        </form>
                        <div className="div">
                            <span className="bb-buttonv">
                                <a href="/users/add" className="btn text-white colr bb-buttonv">Create Item</a></span>
                            <span className="ms-3 bb-buttonv"><button className="btn text-white ms-3 bb-buttonv colr" onClick={logout} type="submit">Logout</button></span>
                        </div>
                    </div>
                </div>
            </nav>
            <Nstyle />
        </div>
    )
}

export default Fboard