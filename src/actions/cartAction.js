import { ADD_TO_CART ,REMOVE_CART_ITEM} from "../constants/CartConstant";
import axios from "axios"
const baseUrl = "https://ecommercebackend-hdlo.onrender.com"
// add item to cart
export const addItemsToCart = (id, quantity) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`)
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity
            }


        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

    }
}
// remove items to cart
export const removeItemFromCart=(id)=>{
    return (dispatch,getState)=>{
     dispatch({
        type:REMOVE_CART_ITEM,
        payload:id
     })
     localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    }
}