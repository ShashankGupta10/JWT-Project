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
                const token = jwt.sign({ loggedInUser }, secret, { expiresIn: '30d' })
                res.status(200).json({msg: "User created", token})
            }
        }
        else{
            // res.status(400).json({msg: "Bad credentials"})
            console.log("aaaaaaaaaaaaaaaaaaa")
        }


    } catch (error) {
        console.log(error)
    }
}


const dashboard = async (req, res) =>{
    try {
        jwt.verify(token, secret)
        res.status(200).json({msg: `Hello Joh Doe`, secret: "Your lucky number is 69"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    dashboard,
}