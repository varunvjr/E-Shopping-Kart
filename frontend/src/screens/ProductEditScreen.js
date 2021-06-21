import React,{useState,useEffect} from 'react'
import{Form,Button} from 'react-bootstrap';
import Message from "../components/Message";
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../components/Loader";
import {Link,useHistory} from 'react-router-dom';
import {listProductsDetails,updateProduct} from "../actions/productActions"
import FormContainer from "../components/FormContainer"
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants"
const ProductEditScreen = (props) => {
    const productId=props.match.params.id;
    const history=useHistory();
    const [price,setPrice]=useState(0);
    const [name,setName]=useState('');
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [stock,setStock]=useState(0);
    const [description,setDescription]=useState('');
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin);
    const {userInfo}=userLogin;
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails;
    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading:updateLoading,error:updateError,success:updateSuccess}=productUpdate;

    useEffect(()=>{
        dispatch({type:PRODUCT_UPDATE_RESET})
        if(!product.name||product._id!==productId){
            dispatch(listProductsDetails(productId));
        }else{
            if(updateSuccess){
                history.push("/admin/productList");
            }else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setStock(product.stock);
            setDescription(product.description);
            }
        }
        
    },[dispatch,productId,product,history,updateSuccess])
    function submitHandler(e){
        e.preventDefault();
        const product={
            _id:productId,
            user:userInfo.id,
            name,
            price,
            image,
            brand,
            category,
            stock,
            description,
            
        }
        dispatch(updateProduct(product))
    }
    return (
        <div>
            <Link to="/admin/productList" className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading&&<Loader/>}
        {updateError&&<Message variant='danger'>{updateError}</Message>}
        {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
             <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
            <Form.Label>Enter the Product Name</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Product Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}>
            </Form.Control>
            </Form.Group>
         <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="text"
                required
                placeholder="Enter the Price"
                value={price}
                onChange={(e)=>{setPrice(e.target.value)}}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Image URL"
            value={image}
            onChange={(e)=>{setImage(e.target.value)}}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                type="text"
                required
                placeholder="Enter the Brand"
                value={brand}
                onChange={(e)=>{setBrand(e.target.value)}}>
                </Form.Control>
            </Form.Group>
        <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Category"
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='stock'>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                type="text"
                required
                placeholder="Enter the Stock"
                value={stock}
                onChange={(e)=>{setStock(e.target.value)}}>
                </Form.Control>
            </Form.Group>
        <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Description"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}>
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Update Product</Button>
        </Form>        
        )}
       </FormContainer>
        </div>
       
    )
}

export default ProductEditScreen;
