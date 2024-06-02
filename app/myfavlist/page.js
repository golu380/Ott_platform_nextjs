"use client"

import { useEffect, useState } from "react"
import { validateUserAction } from "../actions"
import { favMovieAction, favmovieGetAction, getMovieId } from "../actions/favmovieAction"
import { stringify } from "postcss"



export default function (){
    const [user,setUser] = useState(null)
    const [movie_id,setMovie_id] = useState(null)
   useEffect(()=>{
    getMovieId((res)=>
    {
        setMovie_id(res)
    })
   })
    console.log(movie_id)
    return (
        <h1>hell wold</h1>
    )
}