// eslint-disable-next-line
import React,{useState,useEffect,useRef} from 'react'
import {Row,Col,ListGroup,Image,Card,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import Message from "../components/Message";
import axios from 'axios';
import Loader from "../components/Loader";
import {toast} from "react-toastify"
import StripeCheckoutProps from "react-stripe-checkout"
import {Link} from 'react-router-dom';
import {getOrderDetails,payOrder,updateOrderToDelivered} from "../actions/orderActions"
import {ORDER_PAY_RESET,ORDER_UPDATE_RESET} from "../constants/orderConstants";
const OrderScreen = (props) => {
    const [stripeId,setStripeId]=useState();
    const orderDeliver=useSelector(state=>state.orderDeliver);
    const {loading:deliverLoading,success:deliverSuccess,error:deliverError}=orderDeliver;
    const userLogin=useSelector(state=>state.userLogin);
    const {userInfo}=userLogin;
    const cart=useSelector(state=>state.cart);
    const {paymentMethod}=cart;
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails;
    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay;
    toast.configure();
    const dispatch=useDispatch();
    const orderId=props.match.params.id;
        useEffect(()=>{
        if(deliverSuccess){
            window.location.reload(false);
        }
        const addStripeScript=async()=>{
            const {data}=await axios.get("http://localhost:5000/api/config/stripe")
            const {clientId}=data;
            setStripeId(clientId);
        }
       
        if(!order||successPay||order._id!==orderId){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }
        addStripeScript();
       },[orderId,dispatch,order,successPay,loading,deliverSuccess])

    
    if(!loading){
        order.totalItems=order.orderItems.reduce((acc,items)=>acc+items.qty,0)
    }   
   
    const handleToken=async(token,addresses)=>{
        const paymentResult={
            id:orderId,
            status:"success",
            update_time:Date.now(),
            email_address:token.email

        }
        if(paymentResult.status==="success"&&stripeId){
            dispatch(payOrder(orderId,paymentResult));
        }
       
    }
    const deliverHandler=(id)=>{
        dispatch({type:ORDER_UPDATE_RESET})
        dispatch(updateOrderToDelivered(id));
    }
  
    // eslint-disable-next-line
    
    return loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:<div>
        <h1>Order {order._id}</h1>
        <div>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong>
                        <a href={`mailto${order.user.email}`}>{order.user.email}</a>
                        </p>

                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},
                            {order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </p>
                        {order.isDelivered?<Message variant='success'>Delivered :{order.paidAt.substring(0,10)}</Message>:<Message variant='danger'>Not Delivered</Message>}
                     </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method:</strong>
                        {paymentMethod} 
                        </p>
                       {order.isPaid?<Message variant='success'>Paid on :{order.paidAt.substring(0,10)}</Message>:<Message variant='danger'>Not Paid</Message>}
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <h2>Order Items</h2>
                    {order.orderItems.length===0?<Message>Your Cart is Empty</Message>:(
                        <ListGroup variant='flush'>
                        <Row>
                            <Col md={8}>
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                     <Row>
                                         <Col md={3}>
                                             <Image src={item.image} fluid rounded alt={item.name}/>
                                         </Col>
                                         <Col>
                                         <Link to={`/product/${item.product}`}>
                                         {item.name}
                                         </Link>
                                         </Col>
                                         <Col md={4}>{item.qty}x{item.price}= ${item.qty*item.price}/- </Col>
                                         <Col md={4}>
                                            
                                         </Col>
                                     </Row>
                                </ListGroup.Item>
                            ))}
                            </Col>
                        </Row>
                        </ListGroup>
                    )}
                </ListGroup>
            </Col>
            <Col md={4}>
                            <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Items</Col>
                                    <Col>{order.totalItems} pc</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}/-</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}/-</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}/-</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid&&(
                                    <ListGroup.Item>
                                        {loadingPay&&<Loader/>}
                                        <StripeCheckoutProps stripeKey={stripeId} billingAddress={order.shippingAddress.address} token={handleToken} amount={order.totalPrice*100} name="Ekart" /> 
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                        <ListGroup.Item>
                        {deliverLoading&&<Loader/>}
                        {deliverError&&<Message variant='danger'>{deliverError}</Message>}
                        {userInfo.isAdmin&&!order.isDelivered&&(
                            <Button onClick={()=>{deliverHandler(order._id)}} className="btn btn-block">Mark as Delivered</Button>
                        )}
                        </ListGroup.Item>

                       
                        </Col> 

        </Row>   
    </div>
    </div>
}

export default OrderScreen;
 