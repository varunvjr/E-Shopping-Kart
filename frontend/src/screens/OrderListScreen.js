import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import Message from "../components/Message";
import {useHistory} from "react-router"
import Loader from "../components/Loader"; 
import {Table} from "react-bootstrap";
import {listAllOrders} from "../actions/orderActions"
const OrderListScreen = () => {
    const history=useHistory();
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin);
    const orders=useSelector(state=>state.orders);
    const {loading,allOrders,error}=orders;
    const {userInfo}=userLogin;
    console.log(allOrders)
    useEffect(()=>{
        if(userInfo.isAdmin){
            dispatch(listAllOrders())
        }else{
            history.push("/login");
        }
        
    },[dispatch,history,userInfo])
    return (
        <div>
        {loading?(<Loader/>):error?(<Message variant="danger">{error}</Message>):(
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>         
                <tbody> 

                </tbody>       
            </Table>
        )}
            
        </div>
    )
}

export default OrderListScreen
