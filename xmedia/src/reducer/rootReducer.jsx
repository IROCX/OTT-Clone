import axios from 'axios'

const initState = {
    data: [],
    user: null,
    isLoggedIn: false,
    list: []
}

const rootReducer = (state = initState, actions) => {
    if (actions.type === 'ADD TO LIST') {
        let movie = {}
        state.data.find(obj => {
            if (obj.category == actions.category) {
                movie = obj.data.find(movie => movie.id == actions.id)
                movie.category = actions.category
                if (!state.list.includes(movie)) {
                    state.list.push(movie)
                    axios({
                        method: 'post',
                        data: {
                            movie,
                            flag :0
                        },
                        withCredentials: true,
                        url: 'http://localhost:5001/addList'
                    })
                    return {
                        ...state
                    }
                }else{
                    let newlist = state.list.filter(movie => movie.id != actions.id)
                    axios({
                        method: 'post',
                        data: {
                            movie,
                            flag:1
                        },
                        withCredentials: true,
                        url: 'http://localhost:5001/addList'
                    })
                    return {
                        ...state,
                        list:newlist
                    }
                }
            }
        })
       
    }
    if (actions.type === 'ADD TO LIKE') {
        let movie = {}
       
        state.data.find(obj => {
            if (obj.category == actions.category) {
                movie = obj.data.find(movie => movie.id == actions.id)
                if (actions.flag == 0) {
                    // like
                    if (!movie.likes.includes(state.user._id))
                        movie.likes.push(state.user._id)
                } else {
                    // dislike
                    if (movie.likes.includes(state.user._id)) {
                        let newlikes = movie.likes.filter(like => like !== state.user._id)
                        movie.likes = newlikes
                    }
                }
                axios({
                    method: 'post',
                    data: {
                        category: actions.category,
                        id: actions.id,
                        flag: actions.flag
                    },
                    withCredentials: true,
                    url: 'http://localhost:5001/addLike'
                })

            }
        })
        movie.category = actions.category
       
        return {
            ...state,
            list: [...state.list, movie]
        }
    }

    if (actions.type === 'SET USER') {
        return {
            ...state,
            user: actions.user,
            isLoggedIn: true
        }
    }
    if (actions.type === 'RESET USER') {
        return {
            ...state,
            user: null,
            isLoggedIn: false
        }
    }
    if (actions.type === 'FETCH DATA') {
        return {
            ...state,
            data: actions.payload.data.data,
            user: actions.payload.data.user,
            list: actions.payload.data.user.list,
            isLoggedIn: true
        }
    }
    return state;
}

export default rootReducer