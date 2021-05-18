import React from 'react'
import bcrypt from 'bcryptjs'
import { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Signup = ({setUser}) => {
    
    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const getUser = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5001/getUser'
        }).then(res => {
            setUser(res.user)
            history.push('/browse')
        })
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if (password === cpassword) {
            bcrypt.hash(password, 1, (error, hash) => {
                if (error) {
                } else {
                    axios({
                        method: 'post',
                        data: {
                            username,
                            password: hash
                        },
                        withCredentials: true,
                        url: 'http://localhost:5001/signup'
                    }).then(res => {
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
                    })
                }
            })
        }

    }

    return (
        <div className='container'>
            <form onSubmit={handleSignup}>
                <h3 className='form-header'>Signup</h3>
                <div className="input-control">
                    <input type="email" className="form-input" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                </div>
                <div className="input-control">
                    <input type="password" className="form-input" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
                <div className="input-control">
                    <input type="password" className="form-input" id="exampleInputPassword1" onChange={(e) => setCPassword(e.target.value)} placeholder='Confirm Password'  />
                </div>
                <div className="input-control">
                    <button type="submit" className="btn btn-primary">Signup</button>
                </div>
                <div className="form-others">
                    Already a member? <Link to='/login'>Log in</Link>
                </div>
            </form>
        </div>

    )
}
const mapStateToProps = (state) => {
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({ type: 'SET USER', user: user })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);