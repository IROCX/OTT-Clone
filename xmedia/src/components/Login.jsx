import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'


const Login = ({ setUser }) => {

    const history = useHistory();

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const getUser = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5001/getUser'
        }).then(res => {
            setUser(res.data)
            history.push('/browse')
        })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            data: {
                username,
                password
            },
            withCredentials: true,
            url: 'http://localhost:5001/login'
        }).then(res => {
            if (res.data === 'success') {
                getUser()
            }
        })
    }


    return (
        <div className='container'>
            <form onSubmit={handleLogin}>
                <h3 className='form-header'>Login</h3>
                <div className="input-control">
                    <input type="email" className="form-input" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                </div>
                <div className="input-control">
                    <input type="password" className="form-input" id="exampleInputPassword1" name='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
                <div className="input-control">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className="other-options">
                    <div className="">
                        <input type="checkbox" id="subscribeNews" name="subscribe" />
                        <label htmlFor="subscribeNews">Remember Me</label>
                    </div>
                    <Link to='/help'>Need help?</Link>
                </div>
                <div className="form-others">
                    New here? <Link to='/signup'>Signup</Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user:state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({ type: 'SET USER', user: user })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);