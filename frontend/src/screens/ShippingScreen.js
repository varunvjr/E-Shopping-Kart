import React,{useState} from 'react'
import{Form,Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import FormContainer from "../components/FormContainer"
import {saveShippingAddress} from "../actions/cartActions"
import CheckOutSteps from "../components/CheckoutSteps"
const ShippingScreen = () => {
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;
    const history=useHistory();
    const [address,setAddress]=useState(shippingAddress.address);
    const [city,setCity]=useState(shippingAddress.city);
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode);
    const [country,setCountry]=useState(shippingAddress.country);
    const dispatch=useDispatch();
    const submitHandler=()=>{
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push("/payment");
    }
    return (
        <FormContainer>
        <CheckOutSteps step1 step2/>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
            <Form.Label>Enter the Shipping Address</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Address"
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}>
            </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
            <Form.Label>Enter City</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter City"
            value={city}
            onChange={(e)=>{setCity(e.target.value)}}>
            </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
            <Form.Label>Enter Postal Code</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e)=>{setPostalCode(e.target.value)}}>
            </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
            <Form.Label>Enter the Country</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Country"
            value={country}
            onChange={(e)=>{setCountry(e.target.value)}}>
            </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
        </FormContainer>
    )
}

export default ShippingScreen
