import React from 'react'
import axios from 'axios'
import {
    useHistory,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Login from "./Login";
import Signup from './Signup';


function Navbar({ user, setUser }) {

    const history = useHistory();
    const logoutHandler = () => {
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5001/logout'
        }).then(res => {
            console.log(res)
            if (res.data === 'success') {
                setUser()
            }
            history.push('/')
        })
    }
  

    return (
        <div className="navbar">
            <div className="nav-items">
                <span className='brand'> XMedia</span>
                <Link className='btn btn-rounded' to='/login'>Sign in</Link>
            </div>

            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/">
                    <div className="content">
                        <Link className='btn btn-l' to="/signup">Start watching now <i className="fas fa-chevron-right"></i></Link>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Navbar