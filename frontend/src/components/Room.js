import React, {Component} from 'react'
import {Button,Col,Row,Container} from 'reactstrap'

const block = {
   textAlign: 'center',
   fontFamily: 'Permanent Marker', 
   fontFamily: 'cursive',
     fontSize: '100px',
 }
 const room ={
   textAlign: 'center',
   margin: '10px' ,
   height : '100px' ,
   width : '200px' ,
 }
class Room extends Component {
    render(){
        return (
            <Container> 
                <Row>
                    <Col>
                        <Button outline color="secondary" size = "lg"  style={room}>ROOM 1</Button>
                    </Col>
                    <Col>
                        <Button outline color="success" size = "lg" style={room}>ROOM 2</Button>
                    </Col>
                    <Col>
                        <Button outline color="info" size = "lg" style={room}>ROOM 3</Button>
                    </Col>
                    <Col>
                        <Button outline color="warning" size = "lg" style={room}>ROOM 4</Button>
                    </Col>
                </Row>
                <br/>
            </Container>
        );
    }
}

export default Room;