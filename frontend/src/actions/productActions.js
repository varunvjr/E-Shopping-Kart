import {PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS} from "../constants/productConstants";
import axios from 'axios';
export const listProducts=()=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const res=await axios.get("http://localhost:5000/api/products");
        const productData=res.data;
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:productData
        })
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,
            payload:error.response&&error.response.data.message?error.response.data.message:error.message
        })
    }

}

export const listProductsDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`http://localhost:5000/api/products/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,
            payload:error.response&&error.response.data.message?error.response.data.message:error.message
        })
    }

}
export const deleteProduct=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const {userLogin}=getState();
        const {userInfo}=userLogin;
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`http://localhost:5000/api/products/${id}`,config);
        dispatch({
            type:PRODUCT_DELETE_SUCCESS
        })
    }catch(error){
        dispatch({type:PRODUCT_DELETE_FAIL,
            payload:error.response&&error.response.data.message?error.response.data.message:error.message
        })
    }

}