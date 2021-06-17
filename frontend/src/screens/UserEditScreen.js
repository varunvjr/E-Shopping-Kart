import React,{useState,useEffect} from 'react'
import{Form,Button} from 'react-bootstrap';
import Message from "../components/Message";
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../components/Loader";
import {Link,useHistory} from 'react-router-dom';
import {getProfile,updateUser} from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import {USER_UPDATE_RESET} from "../constants/userConstants" 
const UserEditScreen = (props) => {
    const userId=props.match.params.id;
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [isAdmin,setIsAdmin]=useState(false);
    const dispatch=useDispatch();
    const userDetails=useSelector(state=>state.userDetails);
    const {loading,user,error}=userDetails;
    const userUpdate=useSelector(state=>state.userUpdate);
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=userUpdate;

    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type:USER_UPDATE_RESET
            })
            history.push("/admin/userlist")
        }else{
            if(!user.name||user._id!==userId){
                dispatch(getProfile(userId))
            }else{
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin)
            }
        }
        
    },[dispatch,userId,user,successUpdate,history])
    function submitHandler(e){
        e.preventDefault();
        dispatch(updateUser({
            _id:userId,
            name,
            email,
            isAdmin
        }))
    }
    return (
        <div>
            <Link to="/admin/userlist" className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate&&<Loader/>}
        {errorUpdate&&<Message variant='danger'>{errorUpdate}</Message>}
        {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
             <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
            <Form.Label>Enter the Name</Form.Label>
            <Form.Control
            type="text"
            required
            placeholder="Enter the Username"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}>
            </Form.Control>
            </Form.Group>
         <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="text"
                required
                placeholder="Enter the Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
            
            <Form.Check
            
            type="checkbox"
            required
            label="Is Admin"
            checked={isAdmin}
            onChange={(e)=>{setIsAdmin(e.target.checked)}}>
            </Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary'>Update</Button>
        </Form>        
        )}
       </FormContainer>
        </div>
       
    )
}

export default UserEditScreen;
