import React from "react";
import './ImageLinkForm.css';

function ImageLinkForm({onInputChange, onButtonSubmit}){
    return (
        <div>
            <p className="f3">
                {"Face detection ready... Give it a try!"}
            </p>
            <div className="center">
               <div className="form center pa4 br3 shadow-5">
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib bg-yellow pointer"
                    onClick={onButtonSubmit}>
                        Detect</button> 
               </div>
            </div>
        </div>

    );
}

export default ImageLinkForm;