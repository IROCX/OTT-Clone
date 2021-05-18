import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ logoutHandler, user }) {

    const [style, setStyle] = useState({transform:'translateX(200%)'})
    const [sideNav, setSideNav] = useState(false)
    const [icon, setIcon] = useState(<i className="fas fa-align-justify"></i>)

    const sideNavToggle = () => {
        if (sideNav) {
            setStyle({transform:'translateX(200%)'})
            setSideNav(false)
            setIcon(<i className="fas fa-align-justify"></i>)
        } else {
            setStyle({transform:'translateX(0)'})
            setSideNav(true)
            setIcon(<i className="fas fa-times"></i>)
        }
    }

    return (
        <div className='nav'>
            <div className="menu">
                <div className='nav-brand'>XMedia</div>
                <ul className='nav-list'>
                    <li><Link to='/browse'>Home</Link></li>
                    <li><Link to='/browse/movies'>Movies</Link></li>
                    <li><Link to='/browse/series'>Series</Link></li>
                    <li><Link to='/browse/mylist'>My List</Link></li>
                </ul>
            </div>
            <div className="account-controls">
                {user && <div className='profile'>{user.username}</div>}
                <button onClick={logoutHandler} className='btn'>Logout</button>
            </div>

            <div className='sideNavToggle' onClick={sideNavToggle}>{icon}</div>

            <div className="sideNav" style={style}>
                <ul className='sidenav-list' onClick={sideNavToggle}>
                    <li><Link to='/browse'>Home</Link></li>
                    <li><Link to='/browse/movies'>Movies</Link></li>
                    <li><Link to='/browse/series'>Series</Link></li>
                    <li><Link to='/browse/mylist'>My List</Link></li>
                    <li><Link to="" onClick={logoutHandler}>Logout</Link></li>
                </ul>
            </div>



        </div>

    )
}

export default Navbar
