import { useSelector, useDispatch } from "react-redux"
import React, { useState } from "react"
import { clearProductError, getProductAction } from "../../actions/productAction"
import { useEffect } from "react"
import Loader from "../layout/Loader/Loader"
import ProductCard from "../Home/ProductCard"
import "./Products.css"
import { useParams } from "react-router-dom"
import Pagination from "react-js-pagination";
import {useAlert} from "react-alert"
// import Slider from "@material-ui/core/Slide"
import { Slider } from '@mui/material';
import Typography from "@material-ui/core/Typography"
import MetaData from "../layout/MetaData"
let categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Top",
    "Attire",
    "Camera",
    "SmartPhone",

]
const Products = () => {
    const alert=useAlert()
    const { keyword } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 30000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)
    const { product, loading, error, productCount, resultPerpage } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearProductError())
        }
        dispatch(getProductAction(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, ratings,alert,error,category])
    const priceHandler = (event, newPrice) => {
        // console.log(newPrice)
        setPrice(newPrice)
    }
    return (
        <React.Fragment>
            {loading ? (<Loader />) : (
                <React.Fragment>
                    <MetaData title={`${product.name}---Ecommerce`}/>
                    <h2 className="products_heading">Products</h2>
                    <div className="products my-4">
                        {product &&
                            product.map((product) => <ProductCard key={product._id} products={product} />)}
                    </div>
                    {keyword && (
                        <div className="filter_container">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                size="small"
                                max={30000}
                            />
                            <Typography style={{ color: "black" }}>Category</Typography>

                            <ul className="categoryBox">
                                {categories.map((category, index) => {
                                    return (
                                        <li
                                            className="categoryLink"
                                            key={index}
                                            onClick={() => setCategory(category)}
                                        >{category}</li>
                                    )
                                })}
                            </ul>
                            <fieldset>
                                <Typography component="legend">Rating above</Typography>
                                <Slider
                                    value={ratings}
                                    valueLabelDisplay="auto"
                                    onChange={(e, newRating) => {
                                        setRatings(newRating)
                                    }}
                                    size="small"
                                    aria-labelledby="continous-slider"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>

                        </div>
                    )}

                    {
                        <div className="paginationPage">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerpage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>

                    }

                </React.Fragment>
            )}
        </React.Fragment>
    )
}
export default Products