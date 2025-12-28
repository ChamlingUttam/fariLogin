import mongoose, { connect } from "mongoose";
import "dotenv/config"

export const DbConnect = async ()=>{
    try {

        const connect = await mongoose.connect(process.env.MONGO_URI)

        console.log('db connect')
        
    } catch (error) {
        console.log(error)
    }
}