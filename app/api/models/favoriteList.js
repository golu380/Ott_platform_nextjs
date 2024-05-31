
import mongoose from "mongoose";
const MyFavMovieSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    movieapiid:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// export default mongoose.model('MyFavMovie',myFavMovie)
const MyFavMovie = mongoose.models.MyFavMovie || mongoose.model("MyFavMovie", MyFavMovieSchema);
export default MyFavMovie;