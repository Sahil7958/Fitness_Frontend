import React from 'react'
import Image from "next/image";

import "./Featurebox.css"

const Featurebox = (props:any) => {
    console.log(props.image)
    return (
        <div className='a-box'>
            <div className="a-b-img">
                <Image src={props.image} alt='' />
            </div>
            <div className="a-b-text">
                <h2>{props.title}</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quibusdam dignissimos voluptates maiores nulla, accusantium laborum deserunt. Quasi modi esse provident, perferendis numquam vero itaque earum ut sunt dignissimos a!./</p>
            </div>
        </div>
    )
}

export default Featurebox