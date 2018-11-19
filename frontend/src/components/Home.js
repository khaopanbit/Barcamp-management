import React, {Component} from 'react'
import {Button,Col,Row,Container} from 'reactstrap'
import Room from './Room'
// import {Col,Row,Container,Bu}

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
class Home extends Component {
    render(){
        return (
            <Container>
                <Row>
                    <Col style = {block}>
                    BARCAMP
                    </Col>
                </Row>    
                <Room/>
                <br/>
                <Row>
                    <Button outline color="primary" onClick={() => this.props.history.push('/login')} block>Sign in</Button>
                </Row>
            </Container>
        );
    }
}

export default Home;