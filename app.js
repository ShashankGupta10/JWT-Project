const express = require('express');
const app = express();
// const loginRouter = require('./routes/main')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
require('dotenv').config()

const connString = process.env.MONGO_DB_URI
const port = process.env.PORT || 3001


// Routes

// app.use('api/v1/login', loginRouter)


// Middlewares

app.use(express.json());
app.use(express.static('./public'))
app.use(errorHandlerMiddleware);
app.use(notFound);


const StartServer = async () =>{
    try {
        app.listen(port, ()=>{
            console.log(`App connected on port ${port}...`)
        });

        await connectDB(connString)
        console.log("Database Connected...")
    } catch (error) {
        console.log(error)
    }
}

StartServer()