import React from 'react'
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
export default function App() { 
  return (
    <div>
      <Router>
        {/* <Fboard/> */}
        <Switch>
            <Route exact path = "/">
            <Fboard/>
              <div className="mt-5">
              <TableCon/>
              </div>
            </Route>
            <Route exact path = "/login">
              {/* <Fboard/> */}
              <div className="container mt-5">
                <Login/>
              </div>
            </Route>
            <Route exact path = "/users/add">
              <Fboard2/>
              <div className="container mt-5">
                <AddUser/>
              </div>
            </Route>
            <Route exact path = {`/users/edit/:id`}>
              <Fboard2/>
              <div className="container mt-5">
                <Edit/>
              </div>
            </Route>
            <Route exact path = {`/users/:id`}>
              <Fboard2/>
              <div className="container mt-5">
                <Eye/>
              </div>
            </Route>
            <Route exact path = '*' >
            {/* <Fboard/> */}
              <div className="container mt-5">
                <NotFound/>
              </div>
            </Route>
        </Switch>
      </Router>
    </div>
  )
}