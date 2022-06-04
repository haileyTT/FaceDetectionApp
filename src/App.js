import './App.css';
import Navigation from "./Components/Naviagtion";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
//"5.0.1"

const USER_ID = 'zhlhztx7hfq6';
const PAT = '880acefb31984241a6efe6ad86b48efd';
const APP_ID = 'ec2a7e31dc5246c4b170ba6d47d1918b';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';


class App extends Component{

  constructor(){

    super();
    this.state = {
      input: '',
      imageURL:'',
      box:{},
      route: 'SignIn',
      isSignedIn: false
    }
  }

  displayBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById("inputimage");
   const width = Number(image.width);
   const height = Number(image.height);
   return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - clarifaiFace.right_col * width,
     bottomRow: height - clarifaiFace.bottom_row * height,
   };
  }

  onRouteChange = (route) => {
    if (route === 'SignOut') {
      this.setState({isSignedIn: false})
    } else if (route === 'Home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
  });



  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(obj => this.displayBox(this.calculateFaceLocation(obj)))
      .catch(error => console.log('error', error));

      }
 
  render(){
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'Home'
        ? <div> 
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        </div>
        : ( this.state.route === 'SignIn' 
        ? <SignIn onRouteChange={this.onRouteChange}/>
        : <Register onRouteChange={this.onRouteChange}/>
        )
        } 
      </div>
    );
  }

}

export default App;
