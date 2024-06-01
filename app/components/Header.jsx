"use client";
/* eslint-disable */
import { useState,useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams } from "next/navigation";
import { validateUserAction } from "../actions";
import {logoutAction} from "../actions/index"
// import { useUser } from "../Contexts/userContext";
import Login from "../login/page" // eslint-disable-line
import "./Header.css"


export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [userinfo, setUserinfo] = useState(null)
  const [isdrop, setIsdrop] = useState(false);
  // console.log( success)
  
// const userinfo = {
//   name,
//   email,
//   success,
//   mobile
// }
// console.log(userinfo)
// console.log(success)
// const [islogin, setLogin] = useState(success)
// console.log(!success)
useEffect(() => {

  validateUserAction().then(userData => {
    if(userData.success){
      setUserinfo(userData)
    }
    console.log(userData)
    
   
  
  });

}, []);
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const handleLogout = async (e) => {
    // Add your logout logic here
    logoutAction()
    setUserinfo(null)

    console.log('Logging out...');
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
  console.log(userinfo)
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
              (userinfo ) ? (
                <div className="profile-dropdown">
                <button className="profile-toggle" onClick={toggleDropdown}>
                  {userinfo.data.name}
                  
                </button>
                {isdrop && (
                  <div className="dropdown-content">
                    <Link href="#">Profile</Link>
                    <Link href="#" onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
                 
              ):(
               
                <Link 
                href="/login"
                className={`font-semibold text-lg text-neutral-400 hover:text-neutral-200 transition duration-300 ease-in-out`}
                >
                 
                  <button className="bg-white/10 backdrop-blur-3xl rounded-full text-sm px">Login</button>
                </Link>
              )
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
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {isOpen && (
        <div className='pop-overlay'>
          <div className='popup'>
          /* eslint-disable */
            <Login />
            /* eslint-enable */
            <button className='cls-btn' onClick={togglePopup}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
