import React, { useEffect } from "react"
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel"
import { getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard"
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"
import { clearProductError } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import { useState } from "react";
import { addItemsToCart } from "../../actions/cartAction";
const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1)
    const alert = useAlert()
    const { id } = useParams();
    const { loading, product, error } = useSelector((state) => state.productDetails)//access the store state
    console.log(product)
    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearProductError())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, error])
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "green",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product?.ratings,
        isHalf: true
    }
    const incrementQuantity = () => {
        // const qty = quantity;

        if (product.stock<=quantity){
            return
        }
        setQuantity(quantity=>quantity+1)

    }
    const decrementQuantity = () => {
        if(1>=quantity){
            return
        }
      setQuantity(quantity=>quantity-1)
       
    }
    const handleAddTocart=()=>{
        dispatch(addItemsToCart(id,quantity))
        alert.success(`${quantity}  products added to cart`)
    }
    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                <React.Fragment>
                    <MetaData title={`${product.name}--Ecommerce`} />
                    <div className="ProductDetail">
                        <div className="carousal_cont">
                            <div className="productCaroselCont">
                                <Carousel>
                                    {product.images && product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item?.url}
                                            src={item?.url}
                                            alt={`${i} Slide`}
                                        />

                                    )
                                    )}
                                </Carousel>
                            </div>
                        </div>

                        <div className="productDetail_content">
                            <div className="product_detail_block1">
                                <h2>{product.name}</h2>
                                <p className="">Product Id :{product._id}</p>
                            </div>
                            <div className="product_detail_block2">
                                <ReactStars {...options} />
                                <span>{`${product.numOfReview}`} Reviews</span>
                            </div>
                            <div className="product_detail_block3">
                                <h1>₹{product.price}</h1>
                                <div className="inc_dec_addToCart_cont">
                                    <div className="product_detail_inc_dec_btn">
                                        <button onClick={decrementQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={incrementQuantity}>+</button>
                                    </div>

                                    <button onClick={handleAddTocart} className="add_tocart_btn">Add to cart</button>
                                </div>

                                <p>status <b className={product.Stock < 1 ? "redColor" : "greenColor"}>{product.status < 1 ? "OutOfStock" : "InStock"}</b></p>
                            </div>
                            <div className="product_detail_block4">
                                <h2>description</h2>
                                <p>{product.description}</p>
                                <button>Submit review</button>
                            </div>

                        </div>
                    </div>
                    <h1 className="product_review">Product Reviews</h1>
                    {product.reviews && product.reviews[0] ? (
                        <div className="review_container">
                            {product.reviews.map((review) => {
                                return (
                                    <>
                                        <ReviewCard review={review} />
                                    </>
                                )
                            })}
                        </div>
                    ) : (<h1 className="noReviw">No Review Yet</h1>)}
                </React.Fragment>
            )}
        </React.Fragment>

    )
}
export default ProductDetails