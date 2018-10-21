import React, {Component} from 'react'
import "./App.css"
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey:"AIzaSyBNwp4IUDZODI87R9JS6I1qe1fQzBEHngw",
  authDomain:"barcamp-management.firebaseapp.com"
})
class Login extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
  state = {isSignedIn:false,
            dropdownOpen: false}
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
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })
          console.log("user", user)
        })
      }
    1
      render() {
        return (
          <div className="App">
          <font size="90">Barcamp Login</font>
            {this.state.isSignedIn ? (
              <span>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret color = "primary">
                    Button Dropdown
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.props.history.push('/speaker')}>Speaker</DropdownItem>
                    <DropdownItem>Audience</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem style={{color: 'red'}} onClick={() => firebase.auth().signOut()}>Sign out</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
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