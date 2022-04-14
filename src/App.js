import React, { useEffect, useState } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddUser from './components/user/AddUser';
import Login from './components/login/login';
import Edit from './components/user/Edit';
import TableCon from './components/TableCon';
import Fboard from './components/Fboard';
import Fboard2 from './components/Fboard2';
import Eye from './components/user/Eye';
import NotFound from './components/NotFound';
import Cookies from 'universal-cookie';

const AppStyle = () => {
  return (
    <style>
      {`
        .loader-position{
          position: absolute !important;
          top: 25%  !important;
          left: 35% !important;
        }
        @media screen and (max-width:700px){
          .loader-position{
            left: 3% !important;
          }
        }
      `}
    </style>
  )
}
// import Login from './components/user/Login';
export default function App() {
  const cookies = new Cookies();
    const token = cookies.get('auth_key');
  return (
    <div>
      <AppStyle />
      <Router>
        {/* <Fboard/> */}
        <Switch>

          <Route exact path="/">
            <Fboard />
            <div className="mt-5">
              <TableCon />
            </div>
          </Route>
          <Route exact path="/login">
            {/* <Fboard/> */}
            <div style={{ postion: 'relative' }} className="container mt-5">
              
              <Login />
            </div>
          </Route>
          <Route exact path="/users/add">
            <Fboard2 />
            <div className="container mt-5">
              <AddUser />
            </div>
          </Route>
          <Route exact path={`/users/edit/:id`}>
            <Fboard2 />
            <div className="container mt-5">
              <Edit />
            </div>
          </Route>
          <Route exact path={`/users/:id`}>
            <Fboard2 />
            <div className="container mt-5">
              <Eye />
            </div>
          </Route>
          <Route exact path='*' >
            {/* <Fboard/> */}
            <div className="container mt-5">
              <NotFound />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}