import React,{useEffect} from 'react'
 import {Link} from 'react-router-dom';
 import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap';
import Rating from "../components/Rating";
import {useDispatch,useSelector} from 'react-redux';
import {listProductsDetails}  from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductScreen = (props) => {
    const dispatch=useDispatch();
    const ID=props.match.params.id;
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails;
    useEffect(()=>{
       dispatch(listProductsDetails(ID))
    },[dispatch,ID])
    return (
        <>
        <Link className="btn btn-light my-3" to="/">
             Go Back
        </Link>
        {loading?(
            <Loader/>
        ):error?(
            <Message variant='danger'>{error}</Message>
        ):(
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.reviews.comment} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                Rating:{product.rating}
                </ListGroup.Item>
                <ListGroup.Item>
                    Price:${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                Description:{product.description}
                </ListGroup.Item>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <Row>
                        <Col>Price</Col>
                            <Col>
                                <strong> ${product.price}/-</strong>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                    <Row>
                        <Col>Status:</Col>
                        <Col>
                        {product.stock>0?'In Stock':"Out Of Stock"}
                        </Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        
                        <Button  type="button" className="btn btn-block" disabled={product.stock===0}>Add to Cart</Button>
                    </ListGroup.Item>
                    </ListGroup>
                    
                </Card>
            </Col>
        </Row>
        )}
       
        </>
    )
}

export default ProductScreen
