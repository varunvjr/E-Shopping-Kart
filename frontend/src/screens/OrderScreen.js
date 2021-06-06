// eslint-disable-next-line
import React,{useState,useEffect} from 'react'
import {Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import Message from "../components/Message";
import {PayPalButton} from 'react-paypal-button-v2';
import axios from 'axios';
import Loader from "../components/Loader";
import {Link} from 'react-router-dom';
import {getOrderDetails,payOrder} from "../actions/orderActions"
import {ORDER_PAY_RESET} from "../constants/orderConstants";
const OrderScreen = (props) => {
    const cart=useSelector(state=>state.cart);
    const {paymentMethod}=cart;
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails;
    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay;

    const dispatch=useDispatch();
    const orderId=props.match.params.id;
    const [sdkReady,setSdkReady]=useState(false)
    useEffect(()=>{
        const addPayPalScript=async()=>{
            const {data}=await axios.get("http://localhost:5000/api/config/paypal")
            const {clientId}=data;
            const script=document.createElement('script');
            script.type='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true;
            script.onload=()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
       
        
        if(!order||successPay){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdkReady(true);
            }
        }
        addPayPalScript();
       },[orderId,dispatch,order,successPay])

    
    if(!loading){
        order.totalItems=order.orderItems.reduce((acc,items)=>acc+items.qty,0)
    }   
   
    
  
    // eslint-disable-next-line
   
    const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult);
        dispatch(payOrder(orderId,paymentResult))
    }
    
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
                        {order.isDelivered?<Message variant='success'>Delivered :{order.paidAt}</Message>:<Message variant='danger'>Not Delivered</Message>}
                     </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method:</strong>
                        {paymentMethod} 
                        </p>
                       {order.isPaid?<Message variant='success'>Paid on :{order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
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
                                        {!sdkReady?<Loader/>:(
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                        </Col>  
        </Row>   
    </div>
    </div>
}

export default OrderScreen;
 