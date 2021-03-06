import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import Message from "../components/Message";
import { LinkContainer } from 'react-router-bootstrap';
import {useHistory} from "react-router"
import Loader from "../components/Loader"; 
import {Table,Button} from "react-bootstrap";
import {listAllOrders} from "../actions/orderActions"
const OrderListScreen = () => {
    const history=useHistory();
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin);
    const orders=useSelector(state=>state.orders);
    const {loading,allOrders,error}=orders;
    const {userInfo}=userLogin;

    useEffect(()=>{
        if(userInfo&&userInfo.isAdmin){
            dispatch(listAllOrders())
        }else{
            history.push("/login");
        }
        
    },[dispatch,history,userInfo,loading])
    return (
        <div>
        {loading?(<Loader/>):error?(<Message variant="danger">{error}</Message>):(
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>         
                <tbody>    
                {allOrders&&allOrders.map((order=>
                    <tr key={order._id}><td>{order._id}</td><td>{(order.updatedAt).toLowerCase().substring(0,10)}</td>
                    <td>${order.totalPrice}/-</td><td>{order.isPaid?(order.paidAt).substring(0,10):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td><td>{order.isDelivered?(<i className="fas fa-check" style={{color:"green"}}></i>):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                    <td>
                    <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant='light'>Details</Button>
                    </LinkContainer>
                </td>
                    </tr>
                    ))}
                </tbody>       
            </Table>
        )}
            
        </div>
    )
}
export default OrderListScreen
