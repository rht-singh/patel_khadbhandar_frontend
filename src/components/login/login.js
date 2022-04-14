import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const LoStyle = () => {
    return (
        <style>
            {`  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
                .form{
                    width:40%;
                }
                .rotate {
                    animation: rotation 1.5s infinite linear;
                  }
                  
                @keyframes rotation {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(359deg);
                  }
                }
                .font{
                    font-family: 'Poppins', sans-serif;
                }
                @media screen and (max-width:768px){
                    .form{
                        width:100%;
                        padding-top:50px;
                    }
                }
                .img img{
                    widht:150px;
                    height:150px;
                }
                .form-col{
                    padding:1% 10% 10% 10%;
                }
                .heone{
                    font-weight:600;
                    color:darkgreen;
                }
                .he-b{
                    color:gray;
                }
            `}
        </style>
    )
}

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [otp, setotp] = useState("");
    const [click, setclick] = useState(false);
    const [otpPass, setOtpPass] = useState("");
    const [otpClass, setOtpClass] = useState("mb-3 d-none")
    const [textChange, setTextChange] = useState("Get OTP")
    const inputRef = useRef(null);

    const dispatch = useDispatch()
    // const tkn = localStorage.getItem("profile");
    // console.log(tkn)
    const emailValidation = async () => {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (regEx.test(email)) {

            axios({
                method: 'post',
                url: 'https://pkbfertilizer.herokuapp.com/api/v1/login',
                data: { email }
            }).then((res) => {

                if (res.data.status === 'success') {
                    toast.success("OTP Sent")
                    setOtpClass("mb-3 d-block")
                    setTextChange("Submit")
                    setclick(true)
                    inputRef.current.disabled = true;
                }
                else {
                    toast.error("Email Not Registerd")

                }
            })
        } else if (!regEx.test(email) && email !== "") {
            toast.error("Email is not Valid")
        } else {
            toast.error("Email input is empty")
        }
    }
    const cookies = new Cookies();
    const verify = () => {
        axios({
            method: 'get',
            url: `https://pkbfertilizer.herokuapp.com/api/v1/verify?otp=${otp}&email=${email}`
        }).then((res) => {
            cookies.set('auth_key', res.data.token);
            console.log(cookies.get('auth_key'))
            toast.success("Logged In")
            dispatch({ type: 'AUTH', data: res.data.token })
            history.push("/")
        })
    }
    const handleOnChange = (e) => {
        setEmail(e.target.value)
        e.preventDefault();
    }

    const [load, Setload] = useState(true)
    useEffect(() => {
        setTimeout(setspinner, 3000)
    }, [])
    const setspinner = () => {
        Setload(false)
    }

    return (
        <>

            {load?
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <img src="./images/fz3.png" className='rotate' alt="" />
            </div>
            :
            <div className="container-fluid w-100 font">
                <div className="row">
                    <div className="col-12 col-md-12 form-col">
                        <div className="img text-center mb-3">
                            <img src="./images/fz3.png" alt="" />
                        </div>
                        <div action="" className='form m-auto'>
                            <div className="form-top text-center mb-5">
                                <h2 className='mb-3 heone'>Hello ! Welcome back.</h2>
                                <p className='he-b'>There is No Need to Remember a Password, You Need is Your Email</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label w-100">Email</label>
                                <input ref={inputRef} type="email" value={email} onChange={handleOnChange} className="form-control" id="email" placeholder="Enter your email" />
                            </div>
                            <div className={otpClass}>
                                <label htmlFor="text" value={otpPass} onChange={e => setOtpPass(e.target.value)} className="form-label w-100">OTP</label>
                                <input type="text" className="form-control" onChange={e => setotp(e.target.value)} id="text" placeholder="OTP" />
                            </div>
                            <button onClick={click ? verify : emailValidation} className="btn btn-success w-100" id=' tcchange'>{textChange}</button>
                        </div>
                    </div>
                </div>
            </div>}
            <ToastContainer />
            <LoStyle />
        </>
    )
}

export default Login