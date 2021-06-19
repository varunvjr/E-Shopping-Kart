import React,{useState,useEffect} from 'react'
import{Form,Button,Row,Col,Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import Message from "../components/Message";
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../components/Loader";
import {useHistory} from 'react-router-dom';
import {getProfile,updateProfile} from "../actions/userActions"
import {listMyOrders} from "../actions/orderActions"
 
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
    const orderMyList =useSelector(state=>state.orderMyList);
    const {loading:loadingOrders,error:orderError,orders}=orderMyList;
    useEffect(()=>{
        if(!userInfo.name){
            history.push("/login")
        }else{
            console.log("Hi");
            if(!user.name){
                console.log("Hello");
                dispatch(getProfile('profile'))
                dispatch(listMyOrders());

            }else{
                setName(user.name);
                setEmail(user.email);
                localStorage.setItem('userInfo',JSON.stringify(user));
            }
        }

    },[user,userInfo,history,dispatch,orders])
    function submitHandler(e){
        console.log("Form submitted");
        e.preventDefault();
        if(password!==confirmPassword){
            setMessage("Passwords do not match");
        }else{
            dispatch(updateProfile({id:user._id,name,email,password}));
        }
    }
    let orderLi;
    if(orders){
         orderLi=orders.map((order)=>(
            <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>$ {order.totalPrice}</td>
            <td>{order.isPaid?(order.paidAt.substring(0,10)):(
                <i className="fas fa-times" style={{color:"red"}}></i>
            )}</td>
            <td>{order.isDelivered?(order.deliveredAt.substring(0,10)):(
                <i className="fas fa-times" style={{color:"red"}}></i>
            )}</td>
            <td>
                <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm" variant='light'>Details</Button>
                </LinkContainer>
            </td>
            </tr>
           
        ))
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
                {loadingOrders?<Loader/>:orderError?<Message variant="danger"/>:(
                    <Table  striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orderLi}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen;
