import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'
import * as FaIcon from 'react-icons/fa'
import * as BiIcon from 'react-icons/bi'
import * as MdIcon from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ToastContainer, toast } from 'react-toastify';
// import Eye from './user/Eye'/

const TabStyle = () => {
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

                .d-show{
                    display:none !important;

                }
                .d-phone{
                    display:none;
                }
                @media screen and (max-width:980px){
                    .d-laptop{
                        // display:none;    
                    }
                    .d-phone{
                        display:flex;
                        flex-wrap:wrap;
                    }
                    .ddf{
                        display:flex;
                        justify-content:center;
                    }
                }
                @media screen and (max-width:780px){
                    .d-show{
                        display:flex !important;
                    }
                
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
                    .d-laptop{
                        // display:none;
                    }
                    .d-phone{
                        display:flex;
                        flex-wrap:wrap;
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
                .w-n{
                    font-size:17px;
                    font-weight:600;
                }
                .w-dd{
                    width:98%;
                }
            `}
        </style>
    )
}

// {
//     "data":[
//         {"buyer":"Rohit","location":"Panipat"},
//         {"product_name":"shirt","product_id":"6247f51025ea547e12064089","sell":"10"},
//         {"product_name":"shirt","product_id":"624930ce5918a3ab04ae2250","sell":"15"}
//         ]
// }

const TableCon = () => {

    const cookies = new Cookies();
    const token = cookies.get('auth_key');

    const [data, setData] = useState({
        count: 0,
        Quantity: 0,
        Sold: 0,
        total: 0
    })
    const [html, Sethtml] = useState([])
    const [addAnother, setaddAnother] = useState(false)
    const [flag, setFlag] = useState(false)
    const [showSlip, setshowSlip] = useState(false)
    const [Products, setProducts] = useState([])
    const [productNames, setproductNames] = useState([])
    const [salesForm, setsalesForm] = useState([{ 'data': 1 }])
    const [saleData, setsaleData] = useState([{ buyer: '', location: 0 }, { product_id: '', sell: 0 }])
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


    const GenrateSlipt = () => {

        axios({
            method: 'post',
            headers: { auth: `bearer ${token}` },
            url: 'https://pkbfertilizer.herokuapp.com/api/v1/getSlip',
            data: { data: saleData },
        })
            .then((res) => {
                console.log(res)
                if(res.data.sucess || res.data.success){
                    setaddAnother(true)
                    setshowSlip(true)
                }
                if (res.data.html)
                    Sethtml([...html, res.data.html])
                // html.push(res.data.html) 
            })
            .catch(err => console.log(err))

        // console.log(html)
    }
    useEffect(() => {


        axios({
            method: 'get',

            headers: { auth: `bearer ${token}` },
            url: 'https://pkbfertilizer.herokuapp.com/api/v1/AllProduct',
        })
            .then((res) => {
                if (res.data.success === false) {
                    console.log(res.data.error)
                    toast.error(res.data.error)
                    history.push("/login")
                }
                setProducts(res.data.data)
                setproductNames(res.data.data.map((i) => i))
            })
            .catch((error) => { console.log(error) })

        axios({
            method: 'get',

            headers: { auth: `bearer ${token}` },
            url: 'https://pkbfertilizer.herokuapp.com/api/v1/get_all_products_detail',
        })
            .then((resp) => {
                if (resp.data.data.length > 0) {
                    setData(resp.data.data[0])
                }
            })
            .catch((error) => { console.log(error) })

    }, [flag])

    const deleteUser = async (id) => {
        axios({
            method: 'delete',

            headers: { auth: `bearer ${token}` },
            url: `https://ferltilizer.herokuapp.com/api/v1/product/${id}`,
        })
            .then((res) => {
                setFlag(true)
                setFlag(false)
                toast.success('Product Deleted')
            })
    }

    let res = useSelector((state) => state.products.data);

    useEffect(() => {
        if (res != null)
            setProducts(res.data)
    }, [res])

    const addinput = (id) => {
        console.log(id)
        console.log(document.getElementsByClassName('inertInput').item)
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid-main m-auto my-5 popin">
                <div className="row">

                    <div className="col-6 col-md-3 mb-3">
                        <div className="shadow p-3 bg-white rounded text-center">
                            <div className="card-body main-card">
                                <div className="card-icon mb-3"><FaIcon.FaShoppingBag /></div>
                                <h5 className="card-title">Total Product</h5>
                                <p className="card-amount">{data.count}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="shadow p-3 bg-white rounded text-center">
                            <div className="card-body main-card">
                                <div className="card-icon  mb-3"><FaIcon.FaStore /></div>
                                <h5 className="card-title">Quantity</h5>
                                <p className="card-amount">{data.Quantity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="shadow p-3 bg-white rounded text-center">
                            <div className="card-body main-card">
                                <div className="card-icon  mb-3"><FaIcon.FaShoppingCart /></div>
                                <h5 className="card-title">Sold</h5>
                                <p className="card-amount">{data.Sold}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="shadow p-3 bg-white rounded text-center">
                            <div className="card-body main-card">
                                <div className="card-icon  mb-3"><BiIcon.BiMeteor /></div>
                                <h5 className="card-title">Total</h5>
                                <p className="card-amount">{data.total}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="d-flex m-auto pt-5  d-show">
                    <input className="form-control me-2" type="search" value={text} onChange={e => setText(e.target.value)} placeholder="Search" aria-label="Search" />
                    <button onClick={handleClick} className="btn text-white border colr" type="submit">Search</button>
                </form>

                <div className={`container mt-5 mb-3 d-laptop`}>
                    <div className="row d-laptop">
                        <div className="col-2 col-md-2 col-sm-2 col-lg-2">
                            <h2 style={{ fontSize: '15px' }} className="my-2 text-center">No</h2>
                        </div>
                        <div className="col-3 col-md-2 col-sm-2 col-lg-2">
                            <h2 style={{ fontSize: '15px' }} className="my-2 text-center">Product Name</h2>
                        </div>
                        <div className="col-3 col-md-2 col-sm-2 col-lg-2">
                            <h2 style={{ fontSize: '15px' }} className="my-2 text-end ">Quantity</h2>
                        </div>
                        <div className="col-2 col-md-2 col-sm-2 col-lg-2">
                            <h2 style={{ fontSize: '15px' }} className="my-2 text-end">Sold</h2>
                        </div>
                        <div className="col-1 col-md-2 col-sm-2 col-lg-2">
                            <h2 style={{ fontSize: '15px' }} className="my-2 text-end">Action</h2>
                        </div>
                    </div>
                </div>

                <div className={`d-laptop`}>
                    {Products.map((user, index) => {
                        return (
                            <div className="row mb-5 d-laptop pt-3 pb-2 px-1 d-flex flex-wrap popin bg-light m-auto w-100 rounded-3">
                                <div className="col-1 col-md-2 col-sm-2 col-lg-1 m-auto pe-4">
                                    <h3 className="my-2 text-end">{index + 1}</h3>
                                </div>
                                <div className="col-2 col-md-2 col-sm-2 m-auto">
                                    <h5 className="my-2 text-center"><span className='pe-2'><img style={{ width: "50px", height: "50px" }} src={user.img_url} alt="" /></span> {user.product_name}</h5>
                                </div>
                                <div className="col-2 col-md-2 col-sm-2 m-auto">
                                    <h5 className="my-2 text-center">{user.quantity}</h5>
                                </div>
                                <div className="col-2 col-md-2 col-sm-2 m-auto">
                                    <h5 className="my-2 text-center">{user.sold}</h5>
                                </div>
                                <div className="col-3 col-md-2 col-sm-2 col-lg-3 ">
                                    <div className="my-2 text-center">
                                        <button className="btn btn-dan me-3 m-2 " onClick={() => deleteUser(user._id)}> <span><MdIcon.MdDelete /></span> </button>
                                        <Link to={`/users/edit/${user._id}`} className="btn "><img style={{ height: '20px', width: '20px' }} src='./images/icons8-edit-30.png'></img></Link>
                                        <button className="btn btn-dan me-3 m-2" type="button" data-toggle="modal" data-target="#exampleModalLong"><img style={{ height: '25px', width: '25px' }} src='./images/icons8-tasklist-50.png'></img></button>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div class={showSlip ? "accordion accordion-flush " : "accordion accordion-flush d-none"} id="accordionFlushExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id={`flush-heading${user._id}`}>
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${user._id}`} aria-expanded="false" aria-controls={`flush-collapse${user._id}`}>
                                                    Show Slip
                                                </button>
                                            </h2>
                                            <div id={`flush-collapse${user._id}`} class="accordion-collapse collapse" aria-labelledby={`flush-heading${user._id}`} data-bs-parent="#accordionFlushExample">
                                                <div class="accordion-body">
                                                    <div style={{ overflow: "auto" }} id="addSlip" className='my-3 p-2 mt-2'>
                                                        {html.map((res) => {
                                                            return (
                                                                ReactHtmlParser(res.substring())
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Create Slip</h5>

                                            </div>
                                            <div className="modal-body">
                                                <div className='form'>
                                                    <div className="my-2 w-100">

                                                        <div className="mb-3">
                                                            <input type="text" className="form-control" id="in1" name='name' required onChange={(e) => {
                                                                // 1. Make a shallow copy of the array
                                                                // console.log(e.target.id)
                                                                let temp_state = [...saleData];

                                                                // 2. Make a shallow copy of the element you want to mutate
                                                                let temp_element = { ...temp_state[0] };
                                                                // console.log(saleData)

                                                                // 3. Update the property you're interested in
                                                                temp_element.buyer = e.target.value;

                                                                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                                                temp_state[0] = temp_element;

                                                                // 5. Set the state to our new copy
                                                                setsaleData(temp_state);
                                                                // console.log(saleData)
                                                            }}
                                                                placeholder="Buyer Name" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <input type="text" className="form-control" id="in1" name='name' required placeholder="Location" onChange={(e) => {
                                                                // 1. Make a shallow copy of the array
                                                                // console.log(e.target.id)
                                                                let temp_state = [...saleData];

                                                                // 2. Make a shallow copy of the element you want to mutate
                                                                let temp_element = { ...temp_state[0] };
                                                                // console.log(saleData)

                                                                // 3. Update the property you're interested in
                                                                temp_element.location = e.target.value;

                                                                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                                                temp_state[0] = temp_element;

                                                                // 5. Set the state to our new copy
                                                                setsaleData(temp_state);
                                                                // console.log(saleData)
                                                            }}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <hr />
                                                            {salesForm.map((val, index) => (
                                                                <div className="dropdown">
                                                                    <div className='d-flex justify-content-end my-2'>
                                                                        <button type="button" class=" btn-close btn-close-danger" value={index} id={index + 1} aria-label="Close"
                                                                            onClick={(e) => {

                                                                                let temp_state_form = [...salesForm];
                                                                                let temp_state_saleData = [...saleData];


                                                                                console.log(temp_state_form, temp_state_saleData, e.target.value, e.target.id)

                                                                                temp_state_form.splice(e.target.value, 1)
                                                                                temp_state_saleData.splice(e.target.id, 1)

                                                                                setsaleData(temp_state_saleData)
                                                                                setsalesForm(temp_state_form)

                                                                                console.log(salesForm, saleData)

                                                                            }}></button>
                                                                    </div>

                                                                    <select required className="form-control" defaultValue='products' name={index + 1}
                                                                        onChange={(e) => {
                                                                            // 1. Make a shallow copy of the array
                                                                            // console.log(e.target.id)
                                                                            let temp_state = [...saleData];

                                                                            // 2. Make a shallow copy of the element you want to mutate
                                                                            let temp_element = { ...temp_state[e.target.name] };
                                                                            // console.log(saleData)

                                                                            // 3. Update the property you're interested in
                                                                            temp_element.product_id = e.target.value;

                                                                            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                                                            temp_state[e.target.name] = temp_element;

                                                                            // 5. Set the state to our new copy
                                                                            setsaleData(temp_state);
                                                                        }}
                                                                    >
                                                                        <option value='products' disabled >Products</option>
                                                                        {productNames.map((product) => {
                                                                            return (
                                                                                <option value={product._id} id={product._id} >{product.product_name}</option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                    <input type="number" required min='0' className="form-control mt-2" id="in1" name={index + 1} placeholder="Enter sales" onChange={(e) => {
                                                                        let temp_state = [...saleData];

                                                                        // 2. Make a shallow copy of the element you want to mutate
                                                                        let temp_element = { ...temp_state[e.target.name] };
                                                                        // console.log(temop)

                                                                        // 3. Update the property you're interested in
                                                                        temp_element.sell = e.target.value;

                                                                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                                                        temp_state[e.target.name] = temp_element;

                                                                        // 5. Set the state to our new copy
                                                                        setsaleData(temp_state);
                                                                        // console.log(saleData)
                                                                    }} />

                                                                    <hr />
                                                                </div>

                                                            ))}
                                                        </div>
                                                        <div className="mb-3 inertInput d-flex justify-content-end">
                                                            <button className="btn btn-primary rounded-circle" onClick={() => {

                                                                setsalesForm([...salesForm, "new daTa"]);
                                                                setsaleData([...saleData, { product_id: '', sell: 0 }])
                                                            }} >+</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" onClick={GenrateSlipt} className="btn btn-success" data-bs-dismiss="modal">{addAnother ? 'Add reciept' : 'Create Reciept'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <TabStyle />
        </>
    )
}

export default TableCon