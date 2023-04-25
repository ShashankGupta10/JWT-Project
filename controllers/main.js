require('dotenv').config()
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
console.log(secret)

const login =  async (req, res) =>{
    try {
        const { username, password} = req.body;
        const loggedInUser = await User.findOne({username: username})
        console.log(loggedInUser)
        if(loggedInUser){
            if(password == loggedInUser.password){
                const token = jwt.sign({ loggedInUser }, secret)
                res.status(200).json({msg: "User created", token})
            }
        }
        else{
            // res.status(400).json({msg: "Bad credentials"})
            console.log("aaaaaaaaaaaaaaaaaaa");
        }


    } catch (error) {
        console.log(error)
    }
}


const dashboard = async (req, res) =>{
    const secret = process.env.JWT_SECRET
    const authHeader = req.headers.authorization
    console.log(authHeader)
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decoded = await jwt.verify(token, secret)
        console.log(decoded.loggedInUser.username)
        res.status(200).json({msg: `Hello ${decoded.loggedInUser.username}`, secret: `Your secret lucky number is ${Math.floor(Math.random()*100)}`})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    dashboard,
}