import React ,{ Component } from 'react';
import firebase from 'firebase'
import TimeKeeper from 'react-timekeeper';
import {Modal,ModalHeader, ModalBody, ModalFooter, ButtonGroup, Button,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown,
        DropdownToggle, DropdownMenu, DropdownItem,Popover, PopoverBody, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Timepicker } from 'react-timekeeper/lib/components/Timepicker';

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

const ButtonTap = {
    padding: '5px',
    textAlign: 'right',
    backgroundColor: '#F5F5F5'
};

const popoverBody = {
    backgroundColor: '#F5F5F5'
};

const StartTimeButton = {
    marginRight: '5px'
};

class Speaker extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
    this.Popovertoggle = this.Popovertoggle.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleStopTimeChange = this.handleStopTimeChange.bind(this);
    this.toggleStartTimekeeper = this.toggleStartTimekeeper.bind(this);
    this.toggleStopTimekeeper = this.toggleStopTimekeeper.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleSpeakerChange = this.handleSpeakerChange.bind(this)
    this.change = this.change.bind(this);
    this.getData = this.getData.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      isOpen: false,
      modal: [] ,
      popoverOpen: false,
      displayStartTimepicker: false,
      displayStopTimepicker2: false,
      allTopic : [] ,
      topic : "No topic",
      description : "No des.",
      startTime: '6:50 am',
      stopTime: '6:50 pm',
      name : "Speaker",
      room : 0 ,
      vote : 0 ,
      start: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  Popovertoggle(){
    this.setState({
        popoverOpen: !this.state.popoverOpen
      });
  }
  logout() {
    firebase.auth().signOut();
    this.props.history.push('/');
  }
  handleStartTimeChange(newTime){
    this.setState({ startTime: newTime.formatted})
  }
  toggleStartTimekeeper(val){
    this.setState({displayStartTimepicker: val})
  }
  handleStopTimeChange(newTime){
    this.setState({ stopTime: newTime.formatted})
  }
  toggleStopTimekeeper(val){
    this.setState({displayStopTimepicker: val})
  }
  handleTopicChange(e) {
    this.setState({ topic: e.target.value });
  }
  handleSpeakerChange(e) {
    this.setState({ name: e.target.value });
  }
  handleDesChange(e) {
    this.setState({ description: e.target.value });
  }
  modalToggle(id) {
    this.state.modal[id] = !this.state.modal[id]
    this.forceUpdate()
  }
  addNewTopic(){
    var to = this.state.topic
    var des = this.state.description
    var stime = this.state.startTime
    var etime = this.state.stopTime
    var speak = this.state.name
    var r = this.state.room
    var v = this.state.vote
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
    console.log(this.state.topic)
    console.log(this.state.description)
    window.location.reload();
  }
  getData(){
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/topic/",
      dataType: "json",
      success: function () {
        console.log('success')
      }
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
  render() {
    return (
      <div>
        <div>
        <Navbar color="light" light expand="md" style={HeaderTap} >
          <NavbarBrand >SPEAKER</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {/* {firebase.auth().currentUser.displayName} */}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem style={{color: 'red'}} onClick={this.logout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        </div>

        <div style={LogoBar}>
            <h1 style={Logo}>Barcamp</h1>
        </div>
        <div style={ButtonTap} >
            <Button color="secondary" id="Popover1" onClick ={this.Popovertoggle}>Add new topic</Button>
            
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverBody style={popoverBody}>
            <InputGroup >
                <InputGroupAddon addonType="prepend">Topic</InputGroupAddon>
                <Input placeholder="topic" onChange = {this.handleTopicChange} />
            </InputGroup>
            <br/>
            <InputGroup >
                <InputGroupAddon addonType="prepend">Speaker</InputGroupAddon>
                <Input placeholder="name" onChange = {this.handleSpeakerChange} />
            </InputGroup>
            <br/>
            <Input type="textarea" name="text" id="exampleText" placeholder="Description..." onChange = {this.handleDesChange}/>
            <br/>
            <ButtonGroup>
                <Button style={StartTimeButton} onClick={()=>this.toggleStartTimekeeper(true)}>start : {this.state.startTime}</Button>
                <Button onClick={()=>this.toggleStopTimekeeper(true)}>end : {this.state.stopTime}</Button>
            </ButtonGroup>
            <div id="startTime">
                <br/>
                {this.state.displayStartTimepicker ?
                    <TimeKeeper
                        time={this.state.startTime}
                        onChange={this.handleStartTimeChange}
                        onDoneClick={() => {
                            this.toggleStartTimekeeper(false)
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                    :
                    false
                }
            </div>
            <div id="stopTime">
                <br/>
                {this.state.displayStopTimepicker ?
                    <TimeKeeper
                        time={this.state.stopTime}
                        onChange={this.handleStopTimeChange}
                        onDoneClick={() => {
                            this.toggleStopTimekeeper(false)
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                    :
                    false
                }
            </div>
            <Button  onClick ={this.addNewTopic} block>ADD</Button>
          </PopoverBody>
        </Popover>
        </div>
        <div>
            {this.state.allTopic.map((topic, index) => (
              <div>
                <Button color="danger" onClick={() =>this.modalToggle(index+1)}>{topic.topic_name}</Button>
                <Modal isOpen={this.state.modal[index+1]} toggle={() =>this.modalToggle(index+1)} >
                  <ModalHeader toggle={() =>this.modalToggle(index+1)} charCode= "x">{topic.topic_name}</ModalHeader>
                  <ModalBody>
                      {topic.description}
                      <br/>
                      {topic.start_time} - {topic.end_time}
                  </ModalBody>
                  <ModalFooter>by {topic.speaker}</ModalFooter>
                </Modal>
              </div>
            ))}
            {this.change()}
          </div>
      </div>
    );
  }
}

export default Speaker ;