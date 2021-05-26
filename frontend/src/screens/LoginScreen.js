import React,{useState,useEffect} from 'react'
import {Link,useLocation,useHistory} from 'react-router-dom';
import{Form,Row,Col,Button} from 'react-bootstrap';
import Message from "../components/Message";
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../components/Loader";
import {login} from "../actions/userActions"
import FormContainer from "../components/FormContainer"
 
const LoginScreen = () => {
    const history=useHistory();
     const location=useLocation();
     const redirect=location.search.length>0?location.search.split("=")[1]:"/login"
     console.log(location.search);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin);
    const {loading,userInfo,error}=userLogin;
    useEffect(()=>{
            const user=localStorage.getItem('userInfo');
            const userData=JSON.parse(user);
            if(userData){
                history.push("/");
             }
    },[userInfo,redirect,history]); 
    function submitHandler(e){
        e.preventDefault();
        dispatch(login(email,password));
    }
    return (
        <FormContainer>
        <h1>Sign In</h1>
        {error&&<Message variant='danger'>{error}</Message>}
        {loading&&(<Loader/>)}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter the Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Enter the Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}>
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Sign In</Button>
        </Form>     
        <Row className='py-3'>
            <Col>
                New Customer?<Link to="/register">Register</Link>
            </Col>
        </Row>       
        </FormContainer>
    )
}

export default LoginScreen;
