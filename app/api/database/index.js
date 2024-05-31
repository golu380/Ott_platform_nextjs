import mongoose from "mongoose"
import { DB_URI } from "@/app/config"

const connectToDB = async () =>{
    console.log(DB_URI)
    // const url = "mongodb://localhost:27017/Super_watch"
    mongoose.connect(DB_URI).then(()=>{
        console.log("Connected to DB");
    }).catch(err=>
        console.log("Error in DB connection",err)
    )
}

export default connectToDB;