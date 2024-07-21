import React from "react";
import CartItemCard from "./CartItemCard";
import "./Cart.css"
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../../actions/cartAction";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
    const navigate=useNavigate()

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const increaseQuantity = (product_id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity > stock) return
        dispatch(addItemsToCart(product_id, newQty))
    }
    const decreseQuantity = (product_id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return
        dispatch(addItemsToCart(product_id, newQty))
    }
    const deletecartItems = (id) => [
        dispatch(removeItemFromCart(id))
    ]
    const handleCheckout=()=>{
        navigate("/login?redirect=shipping")
    }
    console.log(cartItems)

    return (
        <React.Fragment>
            {cartItems.length < 1 ? (
                <div className="NoProductcartContaier">
                    <MdRemoveShoppingCart size="90px" color="red"/>
                    <h2>No item yet</h2>
                    <Link className="viewProductLink" to="/products">View Products</Link>

                </div>) : (
                <React.Fragment>
                    <div className="cartPage">

                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems && cartItems.map((items) => (
                            <div className="cartContainer my-4">
                                <CartItemCard items={items} deletecartItem={deletecartItems} />
                                <div className="cartInput">
                                    <button onClick={() => decreseQuantity(items.product, items.quantity)}>-</button>
                                    <input type="number" value={items.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(items.product, items.quantity, items.stock)}>+</button>
                                </div>
                                <p className="subtotal">{`${items.price * items.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross total</p>
                                <p>{`₹${cartItems.reduce((acc,items)=>acc+items.quantity*items.price,0
                                )}`}</p>

                            </div>
                            <div></div>
                            <div className="checkoutBtn">
                                <button onClick={handleCheckout}>Check out</button>

                            </div>


                        </div>

                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}
export default Cart