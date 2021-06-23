import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer,productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartReducer"
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer} from "./reducers/orderReducers"
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userProfileDetailsReducer,userListReducer,userDeleteReducer,userUpdateReducer} from "./reducers/userReducer"
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userProfile:userProfileDetailsReducer,
    orderCreate:orderCreateReducer,
    orders:orderListReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMyList:orderListMyReducer,
    usersList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer
});
const cartItemsFromLocalStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{}
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const paymentMethodFromStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}
const initailState={
    cart:{
        cartItems:cartItemsFromLocalStorage,
        shippingAddress:shippingAddressFromStorage,
        paymentMethod:paymentMethodFromStorage
    },
    userLogin:{
        userInfo:userInfoFromLocalStorage
    }
};

const middleware=[thunk];
const store=createStore(reducer,initailState,composeWithDevTools(applyMiddleware(...middleware)))



export default store;