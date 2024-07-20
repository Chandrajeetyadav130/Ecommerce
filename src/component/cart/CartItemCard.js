import React from "react"
import "./CardItemCard.css"
import { Link } from "react-router-dom"

const CartItemCard=({items,deletecartItem})=>{

    return(
        <React.Fragment>
            <div className="cardItemCard">
             <img src={items.image} alt="cartitemiamge" />
             <div className="">
                <Link to={`/product/${items.product}`}/>
                <p>{items.name}</p>
                <span>{`${items.price}`}</span>
                <p onClick={()=>deletecartItem(items.product)}>Remove</p>

             </div>
            </div>
        </React.Fragment>
    )
}
export default CartItemCard