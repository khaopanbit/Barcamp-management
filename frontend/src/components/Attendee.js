import React ,{ Component } from 'react';
import firebase from 'firebase'
import Room from './Room'
import {Container, Modal,ModalHeader, ModalBody, ModalFooter, Button,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem,} from 'reactstrap';
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
    
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
    this.change = this.change.bind(this);
    this.componentDidMount =this.componentDidMount.bind(this);
    this.logout =this.logout.bind(this);
    this.modalRoomToggle = this.modalRoomToggle.bind(this)
    this.update.bind = this.update.bind(this);
    this.state = {
      isOpen: false,
      modal: [] ,
      allTopic : [] ,
      topic : "No topic",
      description : "No des.",
      startTime: '6:50 am',
      stopTime: '6:50 pm',
      name : "Speaker",
      room : 0 ,
      vote : 0 ,
      start: true,
      modalRoom : false
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
  addNewTopic(){
    var to = this.state.topic
    var des = this.state.description
    var stime = this.state.startTime
    var etime = this.state.stopTime
    var speak = this.state.name
    var r = this.state.room
    var v = this.state.vote+1
    const sendData = { 'topic_name' : to, 'description':des, 'start_time':stime, 'end_time':etime, 'speaker':speak, 'room':r, 'vote':v}
    $.ajax({
      dataType: 'json',
      url: 'http://localhost:3000/api/topic/',
      type: 'POST',
      data: JSON.stringify(sendData),
      contentType:'application/json',
    })
    this.setState({
        popoverOpen: !this.state.popoverOpen,
      });
    window.location.reload();
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
  componentDidMount() {
    fetch("http://localhost:3000/api/topic/")
      .then(response => {
        if (response.status !== 200) {
          return console.log('error')
        }
        return response.json();
      })
      .then(data => this.setState({ allTopic: data }));
    console.log('initialize')
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

    const sendData = { 'topic_name':to, 'description': de, 'start_time': st, 'end_time': et,
                      'speaker': sp, 'room': r, 'vote': v }
    $.ajax({
      dataType: 'json',
      url: `http://localhost:3000/api/topic/${index+1}/`,
      type: 'PUT',
      data: JSON.stringify(sendData),
      contentType:'application/json',
    })
    // this.state.modal[index+1] = !this.state.modal[index+1]
    // this.forceUpdate()
    // console.log(to)
    // console.log(v)
    // window.location.reload();
    console.log(index+1)
    console.log(v)
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
                {/* {firebase.auth().currentUser.displayName} */}
                User
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