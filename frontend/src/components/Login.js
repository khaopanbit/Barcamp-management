import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey:"AIzaSyBNwp4IUDZODI87R9JS6I1qe1fQzBEHngw",
  authDomain:"barcamp-management.firebaseapp.com"
});

const Lstyles = {
  textAlign: 'center'
};

const load = {
  textAlign : 'right',
  padding : '50px',
  fontSize : "20px"
};
const welcome = {
  fontSize : '70px'
};

class Login extends Component{
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.changePage =this.changePage.bind(this);
      this.state = {
        isSignedIn:false,
        dropdownOpen: false
      }
    }
    uiConfig = {
      signInFlow : "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks : {
        singInSuccess : () => false 
      }
    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    changePage(){
      setTimeout(() => {
        this.props.history.push('/speaker');
      }, 2000);
    }
    
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }

    render() {
      return (
        <div style={Lstyles}>
          <font size="90">Barcamp Login</font>
          {this.state.isSignedIn ? (
            <span>
              <h1 style={welcome}>Welcome</h1>
              <h4 style={load}>loading...</h4>
              {this.changePage()}
            </span>  
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      )
    }
}

export default Login;