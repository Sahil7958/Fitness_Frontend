"use client"
import React, { useState } from 'react'
import logo1 from "@/assets/logo1.png";
// import {link} from 'react-scroll';
import { IoIosBody } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import "./Navbar1.css"
import Authpopup from "@/Components/AuthPopup/Authpopup";

const Navbar1 = () => {
  const [nav, setNav] = React.useState<any>(false);

  const [isloggedin, setIsloggedin] = React.useState<boolean>(false)

  const [showpopup, setShowpopup] = React.useState<boolean>(false)

  const checklogin = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.ok) {
          setIsloggedin(true)
        }
        else {
          setIsloggedin(false)
        }
      }).catch(err => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    checklogin()
  }, [showpopup])

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    }
    else {
      setNav(false);
    }
  }
  window.addEventListener('scroll', changeBackground);
  return (
    <nav className={nav ? "nav active" : "nav"}>
      <Link href="#main" className='logo'>
        <Image src={logo1} alt="logo" />
      </Link>
      <input type="checkbox" className='menu-btn' id='menu-btn' />
      <label htmlFor="menu-btn" className='menu-icon'>
        <span className='nav-icon'></span>
      </label>
      <ul className='menu'>
        <li><Link href="#main">Header</Link></li>
        <li><Link href="#features">Features</Link></li>
        <li><Link href="#offer">Offer</Link></li>
        <li><Link href="#about">About</Link></li>
        <li><Link href="#contact">Contact</Link></li>
        {/* <li><Link href="/profile"><IoIosBody /></Link></li> */}
        {
          <li><Link href="/" onClick={() => {
            window.location.href = `/New/page.tsx`
          }}>EXERCISES</Link></li>
        }
        {
          isloggedin ?
            <button className='btn' onClick={() => { setShowpopup(true) }}>Logout</button>
            :
            <button className='btn' onClick={() => { setShowpopup(true) }}>Log In</button>
        }
        {
          showpopup && <Authpopup setShowpopup={setShowpopup} />
        }
      </ul>
    </nav>

  )
}

export default Navbar1