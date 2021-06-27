// eslint-disable-next-line
import React,{useState,useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import {Link,useHistory} from 'react-router-dom';
import {createOrder} from "../actions/orderActions"

const PlaceOrderScreen = () => {
    const history=useHistory();
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);
    const orderCreate=useSelector(state=>state.orderCreate);
    // eslint-disable-next-line
    const {order,loading,success,error}=orderCreate;
    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
    }, [success,history,order])
    const {cartItems}=cart;
    cart.ItemsPrice=cartItems.reduce((acc,item)=>acc+item.price*item.qty,0);
    cart.totalItems=cartItems.reduce((acc,items)=>acc+items.qty,0);
    cart.shippingPrice=cart.ItemsPrice>100?0:50;
    cart.taxPrice=cartItems.price>100?cart.ItemsPrice*0.1:cart.ItemsPrice*0.20;
    cart.totalPrice=cart.shippingPrice+cart.taxPrice+cart.ItemsPrice;
    const placeOrder=()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.ItemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
        
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city},
                                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                            </p>
                         </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
                            {cart.paymentMethod} 
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <h2>Order Items</h2>
                        {cart.cartItems.length===0?<Message>Your Cart is Empty</Message>:(
                            <ListGroup variant='flush'>
                            <Row>
                                <Col md={8}>
                                {cartItems.map((item,index)=>(
                                    
                                    <ListGroup.Item key={index}>
                                         <Row>
                                             <Col md={2}>
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
                                        <Col>{cart.totalItems} pc</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice}/-</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Tax</Col>
                                        <Col>${cart.taxPrice}/-</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Total</Col>
                                        <Col>${cart.totalPrice}/-</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {error&&<Message variant="danger">{error}</Message>}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button type="button" className="btn-block" disabled={cart.cartItems===0} onClick={placeOrder}>Place Order</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                            </Col>  
            </Row>   
        </div>
    )
}

export default PlaceOrderScreen;
