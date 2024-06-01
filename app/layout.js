"use client"

import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import { UserProvider } from "./Contexts/userContext";
import { validateUserAction } from "./actions";
import { useState ,useEffect} from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dm = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

// export const metadata = {
//   title: "Supawatch - Explore a cinematic universe like never before",
//   description:
//     "Explore a cinematic universe like never before with our movie site powered by the TMDB API. Immerse yourself in a vast collection of films and discover hidden gems. With seamless integration, watch your favorite movies instantly. Your go-to destination for endless entertainment awaits discover, stream, and experience the magic of cinema today!",
// };
export default function RootLayout({ children }) {

  // console.log(children)
  const [user,setUser] = useState(null)
  const [name,setName] = useState();
  const [email,setEmail] = useState()
  const [success,setSuccess] = useState()
  const [mobile,setMobile] = useState()
  const [token,settoken] = useState()
  
//   useEffect(() => {

//     validateUserAction().then(userData => {

//       console.log(userData.data)
//       console.log(JSON.stringify(userData.success))
//       setName(userData.data.name);
//       setEmail(userData.data.email);
//       setSuccess(JSON.stringify(userData.success))
//       setMobile(userData.data.mobile)
    
//     });
 
// }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${dm.variable}`}>
      
        <SmoothScroll>
          
          <Header  />
         
          {children}
          
          <Footer />
          <Analytics />
          
        
        </SmoothScroll>
      </body>
    </html>
  );
}
