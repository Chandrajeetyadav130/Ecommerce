import {createStore,applyMiddleware,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import { productReducer,productDetailsReducer } from "./reducers/productReducer"
// import { composeWithDevTools } from 'redux-devtools-extension';
import { compose } from "redux";
import { userReducer,profileReducer ,forgotPassword} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
const reducer=combineReducers({
    product:productReducer,
    productDetails:productDetailsReducer,
    userReducer:userReducer,
    profileReducer:profileReducer,
    forgotPassword:forgotPassword,
    cart:cartReducer
})
// const composeEnhancers = composeWithDevTools({});
const composeEnhancers = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' )?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;
let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    }
}
const middleWare=[thunk]
const store=createStore(reducer,initialState,composeEnhancers(applyMiddleware(...middleWare)))
export default  store;