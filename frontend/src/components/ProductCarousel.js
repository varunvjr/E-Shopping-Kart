import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Carousel,Image} from 'react-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch,useSelector } from 'react-redux';
import {listTopProducts} from "../actions/productActions"
const ProductCarousel = () => {
    const dispatch=useDispatch();
    const productTop=useSelector(state=>state.productTop);
    const {loading:topLoading,error:topError,products}=productTop;
    useEffect(()=>{
        dispatch(listTopProducts());
    },[dispatch])
    
    return (
        
        <div>
        {topLoading?<Loader/>:topError?<Message variant='danger'>{topError}</Message>:(
            <Carousel pause='hover' className='bg-dark'>
                {products.map((p)=>(
                    <Carousel.Item key={p._id}>
                        <Link to={`/product/${p._id}`}>
                            <Image src={p.image} alt={p.name} fluid/>
                            <Carousel.Caption className='carousel-caption'>
                            <h2>{p.name} ${p.price}</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )}
            
        </div>
    )
}

export default ProductCarousel
