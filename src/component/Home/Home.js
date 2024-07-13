import React, { useEffect } from "react"
import { PiMouseScrollThin } from "react-icons/pi";
import ProductCard from "./ProductCard"
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearProductError, getProductAction } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
    const alert=useAlert()
    const { loading, error, product, productCount } = useSelector((state) => state.product)
    console.log(product)
    const dispatch = useDispatch()
    useEffect(() => {
        if(error){
             alert.error(error)
             dispatch(clearProductError())
          }
        dispatch(getProductAction())
    }, [dispatch,error,alert])
    return (
        <React.Fragment>
            {loading ? (<Loader/>) : <React.Fragment>
                <React.Fragment>
                    <MetaData title="Ecommerce" />
                    <div className="banner">
                        <p>Welocme to Ecommerce</p>
                        <h1>Find an amazing product below</h1>
                        <a href="#container">
                            <button>
                                scroll <PiMouseScrollThin />
                            </button>
                        </a>

                    </div>
                    <h2 className="featuredH2">Featured Products</h2>
                    <div className="Card_container" id="container">
                        {product && product.map((product, key) => {
                            return (
                                // <React.Fragment key={key}>
                                <ProductCard products={product} />
                                // </React.Fragment>
                            )
                        })}
                    </div>

                </React.Fragment>
            </React.Fragment>}
        </React.Fragment>
    )
}
export default Home