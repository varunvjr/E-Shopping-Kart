import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer,productDetailsReducer} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartReducer"
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer} from "./reducers/orderReducers"
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userProfileDetailsReducer,userListReducer,userDeleteReducer} from "./reducers/userReducer"
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userProfile:userProfileDetailsReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMyList:orderListMyReducer,
    usersList:userListReducer,
    userDelete:userDeleteReducer
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