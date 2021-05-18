import React from 'react'
import Navbar from "./Navbar";
import { useHistory, Switch } from 'react-router-dom'
import axios from 'axios'
import ContentRow from './ContentRow'
import ProtectedRoute from './ProtectedRoute'
import VideoPlayer from './VideoPlayer';
import { connect } from 'react-redux'


const Home = ({ isLoggedIn, user, resetUser, data }) => {

    const history = useHistory();
    const logoutHandler = () => {
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5001/logout'
        }).then(res => {
            if (res.data === 'success') {
                console.log('logout success')
                resetUser()
            }
            history.push('/')
        })
    }

    function Default(category, ...rest) {
        if (category === '') {
            return <div className='moviegrid'>
                {data && data.map((obj, index) => (
                    <ContentRow category={obj.category} data={obj.data} key={index} />
                ))}
            </div>
        } else {
            return <div className='moviegrid'>
                {data && data.map((obj, index) => {
                  
                    if (obj.category === category) {
                        return <ContentRow category={obj.category} data={obj.data} key={index} />
                    }
                    return null
                }
                )}
            </div>
        }
    }


    function List() {
        return (
            
            <div className='moviegrid'>
                <ContentRow category={'MyList'} isList={true} />
            </div>
        )
    }

    return (
        <div>
            <Navbar logoutHandler={logoutHandler} user={user} />
            <Switch>
                <ProtectedRoute isLoggedIn={isLoggedIn} path="/browse/watch/:category/:id" component={VideoPlayer} props />
                <ProtectedRoute isLoggedIn={isLoggedIn} path="/browse/mylist" component={List} />
                <ProtectedRoute isLoggedIn={isLoggedIn} path="/browse/movies" component={() => Default('Movies')} />
                <ProtectedRoute isLoggedIn={isLoggedIn} path="/browse/series" component={() => Default('Series')} />
                <ProtectedRoute isLoggedIn={isLoggedIn} path="/" component={() => Default('')} />

            </Switch>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state.data,
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetUser: () => {
            dispatch({ type: 'RESET USER', user: null })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);