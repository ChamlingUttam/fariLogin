import express from 'express'
import  "dotenv/config"
import { DbConnect } from './mongoose/dbConnect.js'
import router from './router/userRouter.js'
import cors from 'cors'
const PORT = process.env.PORT || 3001
const app = express()

DbConnect()
app.use(express.json())

app.use(cors({
    origin:"https://frontend1-1zz7.onrender.com",
    credentials:true
}))

app.use('/api/users',router)
app.listen(PORT,()=>{
    console.log(`server is ruuning at ${PORT}`)
})

