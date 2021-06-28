import React,{useEffect} from 'react'
import {Row,Col} from "react-bootstrap";
import Product from "../components/Product";
import {listProducts} from "../actions/productActions";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
const HomeScreen = (props) => {
    const keyword=props.match.params.keyword;

   const dispatch=useDispatch();
    const productList=useSelector(state=>state.productList)
    const {loading,error,products}=productList;
    
    useEffect(()=>{
        
       dispatch(listProducts(keyword))
    },[dispatch,keyword])
    return (
        <div>   
            <h1>Latest Products</h1>
            {loading?(
                <Loader/>
            ):error?(
                <Message variant='danger'>{error}</Message>
            ):(
                <Row>
                {products.map((pro,index)=>(
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <Product product={pro}/>
                    </Col>
    
                ))}
                </Row>
            )
           
        }
            

            
           
        </div>
    )
}

export default HomeScreen;
