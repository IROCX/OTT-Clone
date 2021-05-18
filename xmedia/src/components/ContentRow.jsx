import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import tb from './../assets/thumbnail.png'
import { CSSTransition } from 'react-transition-group'


function ContentRow({ category, data, list, isList }) {

    return (
        <div className='row'>
            <h2>{category}</h2>
            <div className='posters'>

                {!isList && data.map(movie => (
                    <CSSTransition
                        key={movie.id}
                        in={true}
                        appear={true}
                        timeout={300}
                        classNames='example'>
                        <Link to={'/browse/watch/' + category + '/' + movie.id} >
                            <div className='movie-tab'>
                                <img src={tb} alt='art' />
                                <p>{movie.title}</p>
                            </div>
                        </Link>
                    </CSSTransition>
                ))}
                {isList && list.length !== 0 && list.map(movie => (
                    <Link to={'/browse/watch/' + movie.category + '/' + movie.id} key={movie.id}>
                        <div className='movie-tab'>
                            <img src={tb} alt='art' />
                            <p>{movie.title}</p></div>
                    </Link>
                ))}
                {isList && list.length === 0 &&
                    <div className='no-content'>Add items to your list to see them here.</div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        list: state.list
    }
}
export default connect(mapStateToProps)(ContentRow)
