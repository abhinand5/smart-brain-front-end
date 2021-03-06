import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'c2d6b4374ae14398a5ce04cebee2f5d2'
});

const particlesConfig = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 1500,
      }
    },
    size: {
      value: 0,
      random: true,
    },
    opacity: {
      value: 1,
    },
    line_linked: {
      color: '#EE4B6A'
    },
    move: {
      enable: true,
      speed: 3,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    onresize: {
      density_auto: true
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      boxes: [] ,
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '' ,
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
      id: data.id,
      name: data.name,
      email: data.email ,
      entries: data.entries,
      joined: data.joined
    }
  })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocations = (data) =>{
    return  data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const height = Number(image.height);
      const width = Number(image.width);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if(response) {
        fetch('https://mysterious-cove-82235.herokuapp.com/image' , {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count } ));
        })
        .catch(console.log)
      } 
      this.displayFaceBoxes(this.calculateFaceLocations(response)) 
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, boxes} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesConfig}
        />
        <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ?  <div>
                <Logo />
                <Rank name={this.state.user.name} entries = {this.state.user.entries} />
                <ImageLinkForm onInputChange = {this.onInputChange} onSubmit={this.onSubmit}/>  
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
              </div>
          : ( 
              route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : ( 
                  route === 'register'
                  ? <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
                  : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )
            )
        } 
      </div>
    );
  }
}

export default App;
