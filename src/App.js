import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddUser from './components/user/AddUser';
import Edit from './components/user/Edit';
import TableCon from './components/TableCon';
import Fboard from './components/Fboard';
import Eye from './components/user/Eye';
export default function App() { 
  return (
    <div>
      <Router>
        <Fboard/>
        <Switch>
            <Route exact path = "/">
              <div className="mt-5">
              <TableCon/>
              </div>
            </Route>
            <Route exact path = "/users/add">
              {/* <Fboard/> */}
              <div className="container mt-5">
                <AddUser/>
              </div>
            </Route>
            <Route exact path = {`/users/edit/:id`}>
            {/* <Fboard/> */}
              <div className="container mt-5">
                <Edit/>
              </div>
            </Route>
            <Route exact path = {`/users/:id`}>
            {/* <Fboard/> */}
              <div className="container mt-5">
                <Eye/>
              </div>
            </Route>
        </Switch>
      </Router>
    </div>
  )
}