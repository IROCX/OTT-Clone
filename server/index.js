const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser')
const bcryptjs = require('bcryptjs')
const expressSession = require('express-session')
const bp = require('body-parser')
const User = require('./model/User')

const app = express()

const data = [
    {
        category: 'NetflixOriginals',
        data: [
            { id: 1, title: "Stranger Things", genre: 'Science fiction/horror', likes: [] },
            { id: 2, title: "The Crown", genre: 'Historical drama', likes: [] },
            { id: 3, title: "Ozark", genre: 'Crime drama', likes: [] },
            { id: 4, title: "Lost in Space", genre: 'Science fiction', likes: [] },
            { id: 5, title: "Narcos: Mexico", genre: 'Crime drama', likes: [] },
            { id: 6, title: "The Umbrella Academy", genre: 'Superhero action', likes: [] },
        ]
    },
    {
        category: 'Movies',
        data: [
            { id: 7, title: "Black Panther", genre: 'Science fiction/horror', likes: [] },
            { id: 8, title: "Avengers: Endgame", genre: 'Historical drama', likes: [] },
            { id: 9, title: "Mission: Impossible - Fallout", genre: 'Crime drama', likes: [] },
            { id: 10, title: "Mad Max: Fury Road", genre: 'Science fiction', likes: [] },
            { id: 11, title: "Spider-Man: Into the Spider-Verse", genre: 'Crime drama', likes: [] },
            { id: 12, title: "Wonder Woman", genre: 'Superhero action', likes: [] },
        ]
    },
    {
        category: 'Series',
        data: [
            { id: 13, title: "Shadow and Bone", genre: 'Science fiction/horror', likes: [] },
            { id: 14, title: "The Nevers", genre: 'Historical drama', likes: [] },
            { id: 15, title: "Game of Thrones", genre: 'Crime drama', likes: [] },
            { id: 16, title: "Invincible", genre: 'Science fiction', likes: [] },
            { id: 17, title: "Attack on Titan", genre: 'Crime drama', likes: [] },
            { id: 18, title: "Vikings", genre: 'Superhero action', likes: [] },
        ]
    }
]


// middleware
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(expressSession({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser('1234'))
app.use(passport.initialize())
app.use(passport.session())
require('./config/auth')(passport)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("logged in")
        return next()
    } res.status(404).send('User not logged in.')
}
// end middleware

mongoose.connect(<connectionStringToMongoDB>,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('MongoDB Atlas connected')
    })


app.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            throw error
        } else if (user) {
            req.logIn(user, error => {
                if (error) {
                    throw error
                } else {
                    res.send('success')
                }
            })
        } else {
            res.send("Username doesn't exist in database")
        }
    })(req, res, next)
})

app.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username }, (error, doc) => {
        if (error) {
            console.log('error', error)
        } else if (doc) {
            console.log('user already exits')
        } else {
            new User({
                username: req.body.username,
                password: req.body.password
            }).save((error) => {
                if (error) {
                    console.log('error', error)
                } else {
                    res.status(200).send('User created')
                }
            })
        }
    })
})

app.get('/getUser', isLoggedIn, (req, res) => {
    res.send(req.user)
})
app.get('/getData', isLoggedIn, (req, res) => {
    res.send(data)
})
app.post('/addLike', (req, res) => {
    let category = req.body.category
    let id = req.body.id
    let flag = req.body.flag

    categoryList = data.find(obj => obj.category === category)

    storedMovie = categoryList.data.find(movie => movie.id == id)

    if (flag == 0) {
        // like
        if (storedMovie.likes.indexOf(req.user._id.toString()) === -1)
            storedMovie.likes.push(req.user._id.toString())
    } else {
        // dislike
        if (storedMovie.likes.includes(req.user._id.toString())) {
            let newlikes = storedMovie.likes.filter(like => like !== req.user._id.toString())
            storedMovie.likes = newlikes
        }
    }
})

app.post('/addList', (req, res) => {
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }
    User.findOne({ username: req.user.username }, (error, doc) => {
        if (error) {
            console.log('error', error)
        } else if (doc) {
            if (req.body.flag === 0) {
                console.log(doc.list)
                if (!containsObject(req.body.movie, doc.list)) {
                    doc.list.push(req.body.movie)
                    console.log('added')
                    doc.save()
                }
            } else {
                if (!containsObject(req.body.movie, doc.list)) {
                    let newlist = doc.list.filter(movie => movie.id !== req.body.movie.id)
                    console.log('removed', newlist, doc.list)
                    doc.list = newlist
                    doc.save()
                }
            }
            res.send('success')
        } else {
            res.send('failed')
        }
    })
})

app.post('/logout', (req, res) => {
    req.logOut()
    res.send('success')
})

app.listen(5001)