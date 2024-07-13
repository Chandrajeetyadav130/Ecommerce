import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productCosntant"
import axios from "axios"
export const  getProductAction=(keyword="",currentPage=1,price=[0,30000],ratings=0)=>{
  return async (dispatch)=>{
   try {
    dispatch({
        type:ALL_PRODUCT_REQUEST
    })
    let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}}}`//here page is defined keyword from backend url
//    if(category){
//      link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}}`//here page is defined keyword from backend url
//    }
    const {data}=await axios.get(link)
    console.log(data)
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
    })
    
   } catch (error) {
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.response.data.message
    })
   }

   }
}
export const  getProductDetails=(id)=>{
    return async (dispatch)=>{
     try {
      dispatch({
          type:PRODUCT_DETAILS_REQUEST
      })
      const {data}=await axios.get(`/api/v1/products/${id}`)
      console.log(data)
      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload:data
      })
      
     } catch (error) {
      dispatch({
          type:PRODUCT_DETAILS_FAIL,
          payload:error.response.data.message
      })
     }
  
     }
  }
export const clearProductError=()=>{
 return async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
  }
}