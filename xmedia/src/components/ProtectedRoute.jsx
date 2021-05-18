import React from 'react'
import { Route, useHistory } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, component: Component, ...rest }) {

    const history = useHistory()
    return (
        <div>
            <Route {...rest}
                render={(props) => {
                    if (isLoggedIn) {
                        return (
                            <Component {...props} />
                        )
                    } else {
                        history.push('/login')
                    }
                }}>
            </Route>
        </div>
    )
}

export default ProtectedRoute
