"use client"
import { useState,useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams } from "next/navigation";
import { validateUserAction } from "../actions";
import {logoutAction} from "../actions/index"
// import { useUser } from "../Contexts/userContext";
import Login from "../login/page"
import "./Header.css"

const useExampleHook = (props) => {
  const [userinfo, setUserinfo] = useState(props);

  useEffect(() => {
    // Do something with the value when it changes
    console.log('Value changed:', userinfo);
  }, [userinfo]); // Run the effect whenever the value changes

  return [userinfo, setUserinfo]; // Return state and updater function
};

export default function Header(props) {
  console.log(props)
  const [isOpen, setIsOpen] = useState(false);
  const [userinfo, setUserinfo] = useExampleHook(props)
  const [isdrop, setIsdrop] = useState(false);
  const [isloading,setLoading] = useState(true)
  // const fetchData = () =>{
  //   validateUserAction().then((res)=>{
  //     setUserinfo(res)
  //     setLoading(false)

  //   });
  // }
  
  
console.log(userinfo)
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const userData = await validateUserAction();
  //   //     setUserinfo(userData);
        
  //   //   } catch (error) {
  //   //     console.error('Error fetching user data:', error);
  //   //   }
  //   // };

  //   fetchData();
  // }, []);
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const handleLogout = async (e) => {
    // Add your logout logic here
    const res = await logoutAction()
    console.log(res)
    setUserinfo(null)

    console.log('Logging out...');
    location.reload()
  };
  const toggleDropdown = () => {
    setIsdrop(!isdrop);
  };

  // console.log(userinfo.success)
  const navigation = [
    { name: "Popular", href: "/popular" },
    { name: "Top Rated", href: "/top-rated" },
    { name: "TV Series", href: "/tv" },
    { name: "Genre", href: "/genre" },
    { name: "Search", href: "/search" },
    // {name:"Login",href:"/#login"}
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  return (
    <>
      <header className="fixed top-0 z-40 inset-x-0 lg:px-10 px-6 py-6">
        <nav className="flex items-center lg:item-start justify-between gap-x-6">
          <Link
            href="/"
            className="relative lg:text-4xl text-3xl font-black tracking-tighter text-transparent uppercase bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-700"
          >
            <h1 className="text-dm">Supawatch</h1>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden block px-3 py-1 bg-white/10 backdrop-blur-3xl rounded-full text-sm"
          >
            Menu
          </button>
          <div className="hidden lg:flex items-center gap-x-24">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`font-semibold text-lg text-neutral-400 hover:text-neutral-200 transition duration-300 ease-in-out`}
              >
                {item.name}
              </Link>
            ))
           
            }
            {
              (props?.user && props?.user?.success === true)?(
                <div className="profile-dropdown">
                <button className="profile-toggle" onClick={toggleDropdown}>
                  {props.user.data.name}
                  
                </button>
                {isdrop && (
                  <div className="dropdown-content">
                    <Link href="/myfavlist">My favorites</Link>
                    <Link href="#" onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
              ):
              <Link 
                href="/login"
                className={`font-semibold text-lg text-neutral-400 hover:text-neutral-200 transition duration-300 ease-in-out`}
                >
                 
                  <button className="bg-white/10 backdrop-blur-3xl rounded-full text-sm px">Login</button>
                </Link>
              
            }
            
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-[#010101]">
            <div className="absolute top-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={1000}
                height={1000}
                alt="Backdrop"
                className="w-full h-full object-contain object-top"
              />
              <div className="absolute top-0 lg:bg-black/30 bg-black/50 inset-0 bg-gradient-to-b from-black/60 from-20% via-black/50 via-40% to-[#010101] to-98%"></div>
            </div>
            <div className="flex items-center justify-between p-6">
              <button
                type="button"
                className="relative lg:hidden block flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <ArrowLongLeftIcon className="w-8 h-8 stroke-neutral-300" />
                <span className="text-neutral-300">Back</span>
              </button>
            </div>
            <div className="relative p-6 pt-14 flex flex-col items-start justify-center gap-6">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => {setMobileMenuOpen(false)
                    setIsOpen(true)}
                  }
                  className="font-semibold text-3xl text-dm text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-700 -skew-y-6 tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
                {
              (props?.user && props?.user?.success === true)?(
                <div className="profile-dropdown">
                <button className="profile-toggle" onClick={toggleDropdown}>
                  {props.user.data.name}
                  
                </button>
                {isdrop && (
                  <div className="dropdown-content">
                    <Link href="/myfavlist" onClick={()=>setMobileMenuOpen(false)}>My favorites</Link>
                    <Link href="#" onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
              ):
              <Link 
                href="/login"
                className={`font-semibold text-lg text-neutral-400 hover:text-neutral-200 transition duration-300 ease-in-out`}
                >
                 
                  <button className="bg-white/10 backdrop-blur-3xl rounded-full text-sm px" onClick={()=>setMobileMenuOpen(false)}>Login</button>
                </Link>
              
            }
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {isOpen && (
        <div className='pop-overlay'>
          <div className='popup'>
            <Login />
            <button className='cls-btn' onClick={togglePopup}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}


// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await validateUserAction()
//   const posts = await res.json()
 
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }