import React, { Component } from 'react';
import firebase from 'firebase'
import Room from './Room'
import {Container, Modal,ModalHeader, ModalBody, ModalFooter, Button,Collapse, Navbar, NavbarToggler,
        NavbarBrand, Nav, UncontrolledDropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const Logo = {
    fontFamily: 'cursive',
    fontSize: '60px',
    color: 'white',
    margin: '30px'
};

const HeaderTap = {
    fontFamily: 'sans-serif'
};

const LogoBar = {
    backgroundColor: 'black',
    display: 'flex',
    height: '150px'
}; 

const mid = {
    textAlign : 'center'
  }
  
  const topicButton = {
    width : '750px',
    height : '50px',
    marginTop : '25px',
    marginRight : '40px',
    marginLeft : '40px'
  }


class Attendee extends Component {
  constructor(props) {
    super(props);
    
    this.logout =this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.change = this.change.bind(this);
    this.update = this.update.bind(this);
    this.checked = this.checked.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.modalRoomToggle = this.modalRoomToggle.bind(this)
    this.componentDidMount =this.componentDidMount.bind(this);
    this.state = {
      modal: [],
      allTopic : [],
      allUser : [],
      topic : "No topic",
      description : "No des.",
      startTime: '6:50 am',
      stopTime: '6:50 pm',
      name : "Speaker",
      username : "user",
      allVote : "",
      userID : 0,
      room : 0,
      vote : 0,
      find : -1,
      isOpen: false,
      start: true,
      modalRoom : false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    firebase.auth().signOut();
    this.props.history.push('/');
  }

  modalToggle(id) {
    this.state.modal[id] = !this.state.modal[id]
    this.forceUpdate()
  }

  modalRoomToggle() {
    this.setState({
        modalRoom: !this.state.modalRoom
    });
  }

  change(){
    if(this.state.start == true){
      for(var i = this.state.start ; i <= this.state.allTopic.length;i++){
        var newArray = this.state.modal.slice();    
        newArray.push({id: false});   
        this.setState({modal:newArray})
      }
      this.setState({start:false})
    }
  }

  checked(){
    this.state.allUser.some((user,index)=>{
      if(user.name==this.state.username){
        this.setState({
          userID: user.id,
          find : index
        });
        return true
      }
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/topic/")
      .then(response => {
        if (response.status !== 200) {
          return console.log('error')
        }
        return response.json();
      })
      .then(data => this.setState({ allTopic: data }));
    fetch("http://localhost:3000/api/user/")
      .then(response => {
        if (response.status !== 200) {
          return console.log('error')
        }
        return response.json();
      })
      .then(data => this.setState({ allUser: data }));
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // Signed in
        const namee = JSON.stringify(user, null, 2);
        const nameE = JSON.parse(namee);
        this.setState({username:nameE.displayName})
        this.checked()
        if(this.state.find === -1){
          var newUser = this.state.username
          var vote = '0'
          const sendDataU = { 'name' : newUser, 'topic_voted' :vote}
          $.ajax({
          dataType: 'json',
          url: 'http://localhost:3000/api/user/',
          type: 'POST',
          data: JSON.stringify(sendDataU),
          contentType:'application/json',
          })
          window.location.reload()
        }else {
          var cur_user = this.state.allUser[this.state.find];
          this.setState({
            allVote :  cur_user.topic_voted,
          })
        }
      } else {
        // Signed out
        this.setState({username:"no user"})
      }
    }.bind(this))
  }

  logout() {
    firebase.auth().signOut();
    this.props.history.push('/');
  }

  update(topic,index){

    var to = topic.topic_name
    var de = topic.description
    var st = topic.start_time
    var et = topic.end_time
    var sp = topic.speaker
    var r = topic.room
    var v = topic.vote+1
    var user = this.state.username
    var tvote = this.state.allVote +"'" + index.toString()
    var idtop = index+1

    if(!this.state.allVote.includes(idtop)){
    
    const sendData = { 'topic_name':to, 'description': de, 'start_time': st, 'end_time': et,
                      'speaker': sp, 'room': r, 'vote': v }
      $.ajax({
        dataType: 'json',
        url: `http://localhost:3000/api/topic/${idtop}/`,
        type: 'PUT',
        data: JSON.stringify(sendData),
        contentType:'application/json',
      })
  
      var user = this.state.username
      var tvote = this.state.allVote+ ',' +(index+1).toString()
      this.setState({allVote:tvote})
      const sendData2 = { 'name':user, 'topic_voted':tvote}
      $.ajax({
        dataType: 'json',
        url: `http://localhost:3000/api/user/${this.state.userID}/`,
        type: 'PUT',
        data: JSON.stringify(sendData2),
        contentType:'application/json',
      })

      alert("You are vote success.")
    }else{
      alert("You voted this topic.")
    }

  }

  render() {
    return (
      <div>

        <div>
          <Navbar color="light" light expand="md" style={HeaderTap} >
            <NavbarBrand >ATTENDEE</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {this.state.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.props.history.push('/speaker')}>Speaker</DropdownItem>
                  <DropdownItem onClick={this.modalRoomToggle}>Room</DropdownItem>
                    <Modal isOpen={this.state.modalRoom} toggle={this.modalRoomToggle} >
                      <ModalHeader toggle={this.modalRoomToggle} charCode= "x">Room</ModalHeader>
                      <ModalBody style={mid}>
                        <Room/>
                      </ModalBody>
                    </Modal>
                  <DropdownItem divider />
                  <DropdownItem style={{color: 'red'}} onClick={this.logout}>Sign out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <div style={LogoBar}>
            <h1 style={Logo}>Barcamp</h1>
        </div>

        <Container style = {mid}>
            {this.state.allTopic.map((topic, index) => (
              <div>
                <Button style = {topicButton} outline color="danger" onClick={() =>this.modalToggle(index+1)}>{topic.topic_name}</Button>
                <Modal isOpen={this.state.modal[index+1]} toggle={() =>this.modalToggle(index+1)} >
                  <ModalHeader toggle={() =>this.modalToggle(index+1)} charCode= "x">{topic.topic_name}</ModalHeader>
                  <ModalBody>
                      {topic.description}
                      <br/>
                      {topic.start_time} - {topic.end_time}
                  </ModalBody>
                  <ModalFooter>
                      by {topic.speaker}
                      <br/>
                      <Button onClick={()=>this.update(topic,index)}>+</Button>
                      </ModalFooter>
                </Modal>
              </div>
            ))}
          {this.change()}
        </Container>
      </div>
    );}
  }

export default Attendee ;