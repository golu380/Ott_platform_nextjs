"use client"

import { useEffect, useState } from "react"
import { validateUserAction } from "../actions"
import { favMovieAction, favmovieGetAction, getMovieId } from "../actions/favmovieAction"
import { stringify } from "postcss"
import Link from "next/link"
import './myfav.css'



export default function (){
    const [user,setUser] = useState(null)
    const [movie_id,setMovie_id] = useState(null)
    const [movies,setMovies] = useState([])
    useEffect(()=>{
        getMovieId().then(res=>{
            setMovie_id(res)
        })
},[])
const moviesids = movie_id?.data

    // useEffect(() => {

    //     validateUserAction().then(userData => {
    //       console.log(userData)
    //       setUser(userData)
    //       setIslogin(localStorage.getItem("islogin"))
        
    //     });
     
    // }, []);
    console.log(moviesids)
    useEffect(() => {
        const fetchMovieDetails = async () => {
          const promises = moviesids?.map(async (movieId) => {
            try {
              const response = await fetch(`/api/getTrailer?id=${movieId.movieapiid}`);
            //   console.log(response)
              if (response.ok) {
                const movieDetails = await response.json();
                console.log(movieDetails)
                return movieDetails;
              } else {
                throw new Error('Failed to fetch movie details');
              }
            } catch (error) {
              console.error('Error fetching movie details:', error);
              return null;
            }
          });
          let moviesData;
          if(promises){
          moviesData = await Promise.all(promises);
          }
          
          setMovies(moviesData?.filter(movie => movie !== null));
        };
    
        fetchMovieDetails();
      }, [moviesids]);

      console.log(movies)
      console.log(moviesids)
    return (
       <div className="main_class">
        <div className="flex flex-wrap items-center lg:gap-4 gap-3"  >
              {movies?.map((item,index) => (
                <Link
                  key={index}
                  href={`https://www.youtube.com/embed/${item.key}`}
                  className="lg:px-4 px-3 py-2 bg-white/10 font-medium backdrop-blur rounded-full text-sm lg:text-base"
                >
                  Favorite {index+1}
                </Link>
              ))}
            </div>
       </div>
        
    )
}