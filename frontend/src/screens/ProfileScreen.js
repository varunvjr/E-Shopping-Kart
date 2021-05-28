import React,{useState,useEffect} from 'react'
import{Form,Button,Row,Col} from 'react-bootstrap';
import Message from "../components/Message";
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../components/Loader";
import {useHistory} from 'react-router-dom';
import {getProfile,updateProfile} from "../actions/userActions"
 
const ProfileScreen = () => {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const dispatch=useDispatch();
    const userDetails=useSelector(state=>state.userDetails);
    const {loading,user,error}=userDetails;
    const userLogin=useSelector(state=>state.userLogin);
    const {userInfo}=userLogin;
    const userProfile=useSelector(state=>state.userProfile);
    const {success}=userProfile;
    useEffect(()=>{
        if(!userInfo.name){
            history.push("/login")
        }else{
            if(!user.name){
                dispatch(getProfile('/profile'))
            }else{
                setName(user.name);
                setEmail(user.email);
                localStorage.setItem('userInfo',JSON.stringify(user));
            }
        }
    },[user,userInfo,history,dispatch])
    function submitHandler(e){
        console.log("Form submitted");
        e.preventDefault();
        if(password!==confirmPassword){
            setMessage("Passwords do not match");
        }else{
            dispatch(updateProfile({id:user._id,name,email,password}));
        }
    }
    return (
        <Row>
            <Col md={2}>
            <h1>Sign In</h1>
            {error&&<Message variant='danger'>{error}</Message>}
            {success&&<Message variant='success'>User Profile Update</Message>}
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
            <Button type='submit' variant='primary'>Update</Button>
            </Form>     
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
