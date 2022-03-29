import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as FaIcon from 'react-icons/fa'
import * as BiIcon from 'react-icons/bi'
import * as MdIcon from 'react-icons/md'

const TabStyle = ()=> {
    return (
        <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
                .popin{
                    font-family: 'Poppins', sans-serif;
                }
                .card-icon{
                    color:rgba(52, 197, 52, 0.767);
                    font-size:30px;
                }
                .card-amount{
                    font-size:30px;
                }
                .table-main{
                    width:100%;
                }
                .item-tab{
                    padding:10px 5px;
                    margin:10px 0px;
                    height:60px;
                    display:block;
                    margin-bottom:55px;
                }
                @media screen and (max-width:780px){
                    .main-card{
                        height:150px;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        flex-direction:column;
                    }
                    .card-amount{
                        font-size:20px;
                        font-weight:600;
                    }
                }
                .item-tab tr{
                    margin-bottom:55px;
                }
                .main-r{
                    align-items:center;

                }
                .container-fluid-main{
                    width:90%;
                }
                .br-one{
                    display:flex;
                    align-items:center;
                }
                .btn-succ{
                    background-color: rgba(52, 197, 52, 0.767);
                    color:white;
                }
                .btn-dan{
                    background-color: white;
                    font-size:20px;
                    color:#f7575c;
                }
                .btn-dan:hover{
                    color:#f7575c;
                }
                h2{
                    font-size:20px;
                    font-weight:600;
                    font-family: 'Poppins', sans-serif;
                }
                h5{
                    font-size:15px;
                    font-weight:500;
                }
                h3{
                    font-size:15px;
                    font-weight:600;
                }
            `}
        </style>
    )
}

const TableCon = () => {
    const [data, setData] = useState("")
    const [users, setUsers] = useState([])
    const loadUsers = async ()=>{
      const resultone = await axios.get("http://localhost:3002/users").catch((error)=>{console.log(error)})
      // console.log(result.data)
      setUsers(resultone.data)
    }
    useEffect(() => {
      loadUsers()
    }, [])
    const deleteUser = async (id)=>{
      await axios.delete(`http://localhost:3002/users/${id}`)
      loadUsers()
    }

    useEffect(() => {
        axios.get("https://ferltilizer.herokuapp.com/api/v1/get_all_products_detail")
        .then((resp)=>{
            setData(resp.data.data[0])
        }).catch((error)=>{console.log(error)})

      }, [])

  return (
    <>
        <div class="container-fluid-main m-auto my-5 popin">
            <div class="row">

                <div class="col-6 col-md-3 mb-3">
                    <div class="shadow p-3 bg-white rounded text-center">
                        <div class="card-body main-card">
                            <div class="card-icon mb-3"><FaIcon.FaShoppingBag/></div>
                            <h5 class="card-title">Total Product</h5>
                            <p class="card-amount">{data.count}</p>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3 mb-3">
                    <div class="shadow p-3 bg-white rounded text-center">
                        <div class="card-body main-card">
                            <div class="card-icon  mb-3"><FaIcon.FaStore/></div>
                            <h5 class="card-title">Quantity</h5>
                            <p class="card-amount">{data.Quantity}</p>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3 mb-3">
                    <div class="shadow p-3 bg-white rounded text-center">
                        <div class="card-body main-card">
                            <div class="card-icon  mb-3"><FaIcon.FaShoppingCart/></div>
                            <h5 class="card-title">Sold</h5>
                            <p class="card-amount">{data.Sold}</p>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3 mb-3">
                    <div class="shadow p-3 bg-white rounded text-center">
                        <div class="card-body main-card">
                            <div class="card-icon  mb-3"><BiIcon.BiMeteor/></div>
                            <h5 class="card-title">Total</h5>
                            <p class="card-amount">{data.total}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-5 mb-3">
                <div class="row">
                    <div class="col-12 col-md-2 m-auto">
                    <h2 className="my-2 text-center">No</h2>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h2 className="my-2 text-center">Product Name</h2>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h2 className="my-2 text-center">Quantity</h2>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h2 className="my-2 text-center">Total</h2>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h2 className="my-2 text-center">Action</h2>
                    </div>
                </div>
            </div>

            <div class="container">
            {users.map((user, index)=>{
                return(
            <div class="row my-2 py-3 d-flex flex-wrap popin bg-light">
                    <div class="col-12 col-md-2 m-auto">
                    <h3 className="my-2 text-center">{index+1}</h3>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h5 className="my-2 text-center"> <span className='pe-2'><img style={{width:"50px", height:"50px"}} src="./images/fz3.png" alt="" /></span> {user.username.slice(0,7)}..</h5>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h5 className="my-2 text-center">{index}..</h5>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <h5 className="my-2 text-center">{user.email.slice(0,12)}..</h5>
                    </div>
                    <div class="col-12 col-md-2 m-auto">
                    <div className="my-2 text-center">
                    <button className="btn btn-dan me-3" onClick={()=> deleteUser(user.id)}> <span><MdIcon.MdDelete/></span> </button>
                    <Link to={`/users/edit/${user.id}`} className="btn btn-succ">Edit</Link>
                    </div>
                    </div>
                </div>
                )
            }
            )}
        </div>
        </div>
        <TabStyle/>
    </>
  )
}

export default TableCon