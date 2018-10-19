import React from 'react';
import firebase from 'firebase'
import TimeKeeper from 'react-timekeeper';
import "./Speaker.css"
import {ButtonGroup, Button,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown,
        DropdownToggle, DropdownMenu, DropdownItem,Popover, PopoverBody, InputGroup, InputGroupAddon, Input } from 'reactstrap';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
    this.Popovertoggle = this.Popovertoggle.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
    this.handleStopTimeChange = this.handleStopTimeChange.bind(this)
    this.toggleStartTimekeeper = this.toggleStartTimekeeper.bind(this)
    this.toggleStopTimekeeper = this.toggleStopTimekeeper.bind(this)
    this.state = {
      isOpen: false,
      popoverOpen: false,
      startTime: '6:50 am',
      displayStartTimepicker: false,
      stopTime: '6:50 pm',
      displayStopTimepicker2: false
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
  addNewTopic(){
    this.setState({
        popoverOpen: !this.state.popoverOpen
      });
  }
  render() {
    return (
      <div>

        <div className="bar">
        <Navbar color="light" light expand="md" className="HeaderTab" >
          <NavbarBrand >Speaker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {firebase.auth().currentUser.displayName}
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

        <div className="LogoBar">
            <h1 className = "Logo">Barcamp</h1>
        </div>
        <div className="ButtonTab" >
            <Button color="secondary" id="Popover1" onClick ={this.Popovertoggle}>Add new topic</Button>
            
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverBody className="PopoverBody">
            <InputGroup>
                <InputGroupAddon addonType="prepend">Topic</InputGroupAddon>
                <Input placeholder="topic" />
            </InputGroup>
            <br/>
            <Input type="textarea" name="text" id="exampleText" placeholder="Description..."/>
            <br/>
            <ButtonGroup>
                <Button className="startTimeButton" onClick={()=>this.toggleStartTimekeeper(true)}>start : {this.state.startTime}</Button>
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
      </div>
    );
  }
}

export default Speaker ;