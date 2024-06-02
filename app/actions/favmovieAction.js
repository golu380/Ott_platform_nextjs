"use server"

import connectToDB from "../api/database";
import MyFavMovie from "../api/models/favoriteList";
import { validateUserAction } from ".";
import User from "../api/models/user";

export async function favMovieAction(movie_id,user_id){
    console.log(movie_id,user_id)

    await connectToDB();

   try{
    const new_created_fav = new MyFavMovie({
        user:movie_id,
        movieapiid:user_id
    })

    const savedfavlist = await new_created_fav.save();
    console.log(savedfavlist)

    if(!savedfavlist){
        return {
            message:"Some error occured"
            
        }
    }
    return {
        message:"successfully added to favorite list",
        data:JSON.parse(JSON.stringify(savedfavlist))
    }
   }catch(error){
    console.log(error)
    return {
        message:"server internal error"
    }
   }

}

export async function favmovieGetAction(user_id){
    console.log(user_id)
    await connectToDB();
    try{
        const movies_ids = await MyFavMovie.find({user:user_id})
        console.log(movies_ids);
        if(!movies_ids){
            return {
                error:"some problme occured!"
            }
        }
        return {
            message:"successfully fetched",
            data:JSON.parse(JSON.stringify(movies_ids))
        }
    }catch(error){
        console.log(error)
        return {
            error :"Server internal error"
        }
    }
}
export async function getMovieId(){
    await connectToDB();
    try{
        const user_detail = await validateUserAction()
        // console.log(user_detail.data._id)
        const userid = user_detail.data._id

        const movies_id = await MyFavMovie.find({user:userid})
        // console.log(movies_id)
        return {
            message:"successfully fetched",
            data: JSON.parse(JSON.stringify(movies_id))
        }
    }catch(err){

        console.log(err)
        return {
            message:"error occured"
            
        }
    }
}