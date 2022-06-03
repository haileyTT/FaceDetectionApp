import React from "react";
import brain from './brain.png';

function Logo(){
    return (
            <div className='bg-yellow center br3 pa3 ma1 bw2 shadow-5'
            style={{width: "80px", height: '80px'}}>
                <img alt="Logo" src={brain}/>
            </div>
    );
}

export default Logo;