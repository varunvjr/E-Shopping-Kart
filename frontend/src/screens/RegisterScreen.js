import React,{useState,useEffect} from 'react'
import{Form,Button,Row,Col} from 'react-bootstrap';
import Message from "../components/Message";
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../components/Loader";
import {Link,useHistory} from 'react-router-dom';
import {register} from "../actions/userActions"
import FormContainer from "../components/FormContainer"
 
const RegisterScreen = () => {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister);
    const {loading,userInfo,error}=userRegister;
    useEffect(()=>{
        if(userInfo){
            history.push("/")
        }
    },[userInfo,history])
    function submitHandler(e){
        console.log("Form submitted");
        e.preventDefault();
        if(password!==confirmPassword){
            setMessage("Passwords do not match");
        }else{
            dispatch(register(name,email,password));
        }
    }
    return (
        <FormContainer>
        <h1>Sign In</h1>
        {error&&<Message variant='danger'>{error}</Message>}
        {message&&<Message variant='warning'>{message}</Message>}
        {loading&&(<Loader/>)}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
            <Form.Label>Enter the Name</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Username"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}>
            </Form.Control>
            </Form.Group>
         <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="text"
                required
                placeholder="Enter the Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            required
            placeholder="Enter the Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
        type="password"
        required
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}>
        </Form.Control>
    </Form.Group>
        <Button type='submit' variant='primary'>Register</Button>
        </Form>     
        <Row className='py-3'>
        <Col>
            Have an Account?<Link to="/login">Login</Link>
        </Col>
    </Row>      
        </FormContainer>
    )
}

export default RegisterScreen;
