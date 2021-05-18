import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

function VideoPlayer({ movie, addToList, setLikes, user, list }) {
    const { category, id } = useParams()

    const [likeIcon, setlikeIcon] = useState(<i className="far fa-thumbs-up fa-3x" value='like'></i>)
    const [listIcon, setListIcon] = useState(<i className="fas fa-plus-circle fa-3x" ></i >)
    const listHandler = () => {
        addToList(category, id)
    }
    const likeHandler = (flag) => {
        setliked(!liked)
        setLikes(category, id, flag)
    }

    const [liked, setliked] = useState(false)
    useEffect(() => {
        if (movie.likes.includes(user._id)) {
            setlikeIcon(<i class="fas fa-thumbs-up"></i>)
        } else {
            setlikeIcon(<i className="far fa-thumbs-up fa-3x" value='like'></i>)
        }

        function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === obj) {
                    return true;
                }
            }

            return false;
        }
       
        if (containsObject(movie, list)) {
            setListIcon(<i class="fas fa-check"></i>)
        } else {
            setListIcon(<i className="fas fa-plus-circle fa-3x" ></i >)
        }

    }, [liked])


    return (
        <div>
            {movie && <div className='movie'>
                <video src="" controls></video>
                <div className='details'>
                    <div className='description'>
                        <h2>{movie.title}</h2>
                        <p>#{category}</p>
                        <p>Genre : {movie.genre}</p>
                    </div>
                    <div className='actions'>
                        <button onClick={listHandler}>{listIcon}<div>Add to list</div></button>
                        <button onClick={() => likeHandler(0)}>{likeIcon}<div><span>{movie.likes.length}</span> Like</div></button>
                        <button onClick={() => likeHandler(1)}><i className="far fa-thumbs-down fa-3x"></i><div>Dislike</div></button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

const mapStateToProps = (state, myProps) => {
    let id = myProps.match.params.id
    let category = myProps.match.params.category
    let movie = {}
    state.data.find(obj => {
        if (obj.category === category) {
            movie = obj.data.find(movie => movie.id == id)
        }
    })
    return {
        movie: movie,
        user: state.user,
        list: state.list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToList: (category, id) => {
            dispatch({ type: 'ADD TO LIST', category: category, id: id })
        },
        setLikes: (category, id, flag) => {
            dispatch({ type: 'ADD TO LIKE', category: category, id: id, flag: flag })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)