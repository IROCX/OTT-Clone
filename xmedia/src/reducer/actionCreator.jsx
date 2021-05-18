import axios from 'axios'

export const fetchDataSuccess = data => ({
    type: 'FETCH DATA',
    payload: { data }
})


export const fetchData = () => {
    return async dispatch => {
        try {
            let { data } = await axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:5001/getData'
            })

            let { data:user }  = await axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:5001/getUser'
            })
            dispatch(fetchDataSuccess({data, user}))
        }
        catch (e) {
            console.log("ERROR IN FETCH DATA", e)
        }
    }
}