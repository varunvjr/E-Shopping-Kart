import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer,productDetailsReducer} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartReducer"
import {userLoginReducer} from "./reducers/userReducer"
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer
});
const cartItemsFromLocalStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{}
const initailState={
    cart:{
        cartItems:cartItemsFromLocalStorage
    },
    userLogin:{
        userInfo:userInfoFromLocalStorage
    }
};

const middleware=[thunk];
const store=createStore(reducer,initailState,composeWithDevTools(applyMiddleware(...middleware)))



export default store;