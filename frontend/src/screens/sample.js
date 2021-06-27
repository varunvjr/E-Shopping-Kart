// eslint-disable-next-line
import React,{useState,useEffect} from 'react'
import {Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import {Link,useHistory} from 'react-router-dom';
import {getOrderDetails} from "../actions/orderActions"

const OrderScreen = (props) => {
    const history=useHistory();
    const orderId=props.match.params.id;
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails;
    console.log("Order Details",order);
    const dispatch=useDispatch();
    // eslint-disable-next-line
   useEffect(()=>{
    dispatch(getOrderDetails(orderId))
   },[orderId,dispatch])
  
    
    return loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:<div>
        <h1>Order {order._id}</h1>
        <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},
                            {order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </p>
                     </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        PayPal <i class="fab fa-cc-paypal"></i> 
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
                                         <Col md={1}>
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
                            </ListGroup>
                        </Card>
                        </Col>  
        </Row>   
    </div>
    </div>
}

export default OrderScreen;
 