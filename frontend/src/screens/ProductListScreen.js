import React,{useEffect} from 'react'
import Paginate from '../components/Paginate';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from "../components/Message";
import {useHistory} from "react-router"
import Loader from "../components/Loader"; 
import {Table,Button,Row,Col,Pagination} from "react-bootstrap";
import {listProducts,deleteProduct,createProduct} from "../actions/productActions"
import {PRODUCT_CREATE_RESET} from "../constants/productConstants"
const ProductListScreen = (props) => {
    const pageNumber=props.match.params.pageNumber||1;
    const history=useHistory();
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin);
    const productList=useSelector(state=>state.productList);
    const productDelete=useSelector(state=>state.productDelete);
    const productCreate=useSelector(state=>state.productCreate);
    const {loading:createLoading,error:createError,success:createSuccess,createdProduct}=productCreate;
    const {loading:productLoading,error:productError,products,page,pages}=productList;
    const {loading:deleteLoading,success:deleteSuccess,error:deleteError}=productDelete;
    const {userInfo}=userLogin;
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push("/login");
        }else{
            if(createSuccess){
                history.push(`/admin/product/${createdProduct._id}/edit`);
            }else{
                dispatch(listProducts('',pageNumber))
            }
        }
        
    },[dispatch,history,userInfo,deleteSuccess,createSuccess,createdProduct,pageNumber])
    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id));
        }
    }
    const createProductHandler=()=>{
        dispatch(createProduct());
    }
    return (
        <div>
        <Row>
            <Col>
                <h1>Products</h1>
            </Col>
             <Col className='text-right'>
                <Button className="my-3" onClick={createProductHandler}><i className='fas fa-plus'></i> Create Product</Button>
            </Col>
        </Row>
        <Row>
        <br/>
        {deleteLoading&&<Loader/>}
        {deleteError&&<Message variant='danger'>{deleteError}</Message>}
        {createLoading&&<Loader/>}
        {createError&&<Message variant='danger'>{createError}</Message>}
        {productLoading?(<Loader/>):productError?(<Message variant="danger">{productError}</Message>):(
            <>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>         
                <tbody>
                    {products.map(product=>(
                      <tr key={product._id}><td>{product._id}</td><td>{product.name}</td><td>{product.price}</td><td>{product.category}</td><td>{product.brand}</td><td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>{deleteHandler(product._id)}}><i className='fas fa-trash'></i></Button>
                      </td>
                      </tr>  
                    ))}
                </tbody>       
            </Table>
            <Paginate page={page} pages={pages} isAdmin={userInfo.isAdmin}/>
            </>
        )}
        </Row>
            
        </div>
    )
}

export default ProductListScreen
