import React,{useState} from 'react'
import{Form,Button,Col,Row} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import FormContainer from "../components/FormContainer"
import {savePaymentMethod} from "../actions/cartActions"
import CheckOutSteps from "../components/CheckoutSteps"
const PaymentScreen = () => {
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;
    const [paymentMethod,setPaymentMehod]=useState('');
    const history=useHistory();
    if(!shippingAddress){
        history.push("/shipping");
    }
    const dispatch=useDispatch();
    const submitHandler=()=>{
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder");
    }
    return (
        <FormContainer>
        <CheckOutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
                <Row>
                <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    name='PayPal'
                    value='PayPal'
                    onChange={(e)=>setPaymentMehod(e.target.value)}
                ></Form.Check>
            </Col>
                </Row>
            </Form.Group> <br/>
           
               
           
           
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
