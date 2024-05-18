import React from 'react'

import Featurebox from '../Featurebox/Featurebox'
import img1 from "@/assets/1.svg";
import img2 from "@/assets/2.svg";
import img3 from "@/assets/3.svg";
import img4 from "@/assets/4.svg";

import Image from "next/image";
import about from "@/assets/about.png";

import "./Header.css"

const Header = () => {

  return (
    <div className='header-main'>

      <div id='header-main'>
        <div className="header-heading">
          <h2>STEP UP YOUR</h2>
          <h1><span>FITNESS WITH US</span></h1>
          <p className="details">Build Your Body And Fitness With Professional Touch</p>
          <div className="header-btns">
            <a href="" className='header-btn'>JOIN US</a>
          </div>
        </div>
      </div>

      <div id='features'>
        <h1>FEATURES</h1>
        <div className="a-container">
          <Featurebox image={img1} title="Weight Lifting" />
          <Featurebox image={img2} title="Specific Muscle" />
          <Featurebox image={img3} title="Flex Your Muscle" />
          <Featurebox image={img4} title="Cardio Exercise" />
        </div>
      </div>

      <div id='offer'>
        <div className="pr-heading">
          <h1>A BIG <span>OFFER</span> FOR THIS SUMMER </h1>
          <p className='details'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus esse repellendus magni, commodi sit tempora saepe vitae ex aliquam deleniti officiis labore minima necessitatibus incidunt sunt laudantium eaque illo! Consequuntur!</p>
          <div className="pr-btns">
            <a href="#" className='pr-btn'>JOIN NOW</a>
          </div>
        </div>
      </div>

      <div id="about">
        <div className="about-image">
          <Image src={about} alt="" />
        </div>
        <div className="about-text">
          <h1>LEARN MORE ABOUT US</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum
            repudiandae, sequi vero dolores quia, nesciunt quisquam nostrum
            reiciendis amet totam pariatur porro nulla nisi nemo possimus ipsum
            rem adipisci.
          </p>
          <button>READ MORE</button>
        </div>
      </div>

      <div id='contact'>
        <h1>CONTACT US</h1>
        <form action="">
          <input type="text" placeholder='FUll Name' required />
          <input type="email" placeholder='Your Email' required />
          <textarea name="message" placeholder='Write Here...' cols={30} rows={10}></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>

    </div>
  )
}

export default Header