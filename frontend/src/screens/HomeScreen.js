import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap";
import Product from "../components/Product";
import axios from 'axios';
const HomeScreen = () => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        const fetchProducts=async()=>{
           const res=await axios.get("http://localhost:5000/api/products");
           setProducts(res.data);
        }
        fetchProducts();
    },[])
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>

            {products.map((pro,index)=>(
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Product product={pro}/>
                </Col>

            ))}
            </Row>
           
        </div>
    )
}

export default HomeScreen;
