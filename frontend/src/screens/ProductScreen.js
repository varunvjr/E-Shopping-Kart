import React,{useEffect,useState} from 'react'
 import {Link,useHistory} from 'react-router-dom';
 import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from "../components/Rating";
import {useDispatch,useSelector} from 'react-redux';
import {listProductsDetails,createReview}  from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from '../components/Meta';
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants"
const ProductScreen = (props) => {
    const dispatch=useDispatch();
    const ID=props.match.params.id;
    const productDetails=useSelector(state=>state.productDetails)
    const userLogin=useSelector(state=>state.userLogin);
    const productReview=useSelector(state=>state.productReview);
    const {loading:reviewLoading,success:reviewSuccess,error:reviewError}=productReview;
    const {userInfo}=userLogin;
    const {loading,error,product}=productDetails;
    useEffect(()=>{
        if(reviewSuccess){
            alert("Review Submitted Successfully")
            setRating(0);
            setComment('');
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
       dispatch(listProductsDetails(ID))
    },[dispatch,ID,reviewSuccess])
    const [qty,setQty]=useState(1);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState('');
    const history=useHistory();
    const addToCartHandler=()=>{
        history.push(`/cart/${ID}?qty=${qty}`)
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(createReview({rating,comment},ID))
    }
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
            <>
            <Row>
            <Meta title={product.name}/>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.reviews} reviews`}/>
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
            <Col md={6}>
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
                    {product.stock>0&&(
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>   
                                    <Form.Control as='select' value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                    {[...Array(product.stock).keys()].map(x=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                    </Form.Control>
                                   
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button onClick={addToCartHandler}  type="button" className="btn btn-block" disabled={product.stock===0}>Add to Cart</Button>
                    </ListGroup.Item>
                    </ListGroup>
                    
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews===0&&<Message>No Reviews</Message>}
                <ListGroup variant="flush">
                 {product.reviews>0&&product.totalreviews.map((r)=>(
                     <ListGroup.Item key={r._id}>
                        <strong>{r.name}</strong><br/>
                        <Rating value={r.rating}/>
                        <strong>{r.comment}</strong>
                        <p>{r.createdAt.substring(0,10)}</p>
                     </ListGroup.Item>
                 ))}
                 <ListGroup.Item>
                 {reviewLoading&&<Loader/>}
                 {reviewError&&<Message variant='danger'>{reviewError}</Message>}
                  <h2>Write a Customer Review</h2>
                  {userInfo?(
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Submit</Button>
                      </Form>
                  ):(
                      <Message>Please <Link to="/login">Sign In</Link> to write a review {' '}</Message>
                  )}
                 </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
       
        </>
    )
}

export default ProductScreen
