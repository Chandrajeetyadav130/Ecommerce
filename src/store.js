import {createStore,applyMiddleware,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import { productReducer,productDetailsReducer } from "./reducers/productReducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import { compose } from "redux";
import { userReducer } from "./reducers/userReducer";
const reducer=combineReducers({
    product:productReducer,
    productDetails:productDetailsReducer,
    userReducer:userReducer
})
// const composeEnhancers = composeWithDevTools({});
const composeEnhancers = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' )?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;
let initialState={}
const middleWare=[thunk]
const store=createStore(reducer,initialState,composeEnhancers(applyMiddleware(...middleWare)))
export default  store;