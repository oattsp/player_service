const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const ADMIN_USER = process.env.ADMIN_USER
const SECRET = process.env.SECRET

const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: SECRET,
}
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   if(payload.sub === ADMIN_USER) {
        done(null, true)
   }
   else {
        done(null, false)
   }
})

const passport = require('passport')
passport.use(jwtAuth)

const requireJWTAuth = passport.authenticate('jwt',{session:false})

app.get('/player', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Players.findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/player/:id', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Players.findOne({
            where: {'id': req.params.id}
        })
        if (result) {
            res.status(200).json(result)  
        } else {
            res.status(404).json({
                message: 'player not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.get('/player/code/:code_game', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Players.findAll({
            where: {'code_game': req.params.code_game}
        })
        if (result) {
            res.status(200).json(result)  
        } else {
            res.status(404).json({
                message: 'player not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.post('/player', async (req, res) => {
    try {
        const player = await db.Players.create(req.body)
        res.status(201).json(player)  
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.put('/player/:id', async (req, res) => {
    try {
        const result = await db.Players.findOne({
            where: {'id': req.params.id}
        })
        if (!result) {
            return res.status(404).json({
                message: 'player not found!!'
            })
        }

        const player = await db.Players.update(req.body, {
            where: {'id': result.id}
        })

        if ([player]) {
            const updatePlayer = await db.Players.findByPk(result.id)
            res.status(200).json(updatePlayer)  
        } else {
            throw new Error('update player failure!!')
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})
 
app.delete('/player/:id', requireJWTAuth, async (req, res) => {
    try {
        const deleted = await db.Players.destroy({
            where: {'id': req.params.id}
        })
        if (deleted) {
            res.status(204).json({
                message: 'player deleted'
            })  
        } else {
            res.status(404).json({
                message: 'player not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.delete('/player', requireJWTAuth, async (req, res) => {
    try {
        const deleted = await db.Players.destroy({
            where: {},
            truncate: true
        })
        if (deleted) {
            res.status(204).json({
                message: 'player deleted'
            })  
        } else {
            res.status(404).json({
                message: 'player not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, ()=>{
    console.log(`on PORT: ${PORT}`)
    console.log(`on ENV: ${ENV}`)
    console.log('player service is running')
})