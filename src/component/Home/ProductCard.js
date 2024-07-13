import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import "./home.css"
const ProductCard = ({ products }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "green",
        size: window.innerWidth < 600 ? 20 : 25,
        value: products.ratings,
        isHalf: true
    }
    // const img_url = "https://media.istockphoto.com/id/1696725120/photo/portrait-of-handsome-young-man-giving-thumbs-up-against-gray-background.webp?s=2048x2048&w=is&k=20&c=ieJkpur2v_1YtuIRVd_VaXsyPiAngsUvTcECMsTCyX4="

    return (
        <Link className="productCard border" to={`/product/${products._id}`}>
            <img className="product_image" src={products.images[0].url} alt="Girl in a jacket" width="200" height="200" />
            <div className="px-1">
                <p>{products.name}</p>
                <div className="prod_rating_div">
                    <ReactStars {...options} /><span>{`Reviews:${products.numOfReview}`}</span>
                </div>
                <span> {`₹${products.price}`}</span>
                <p className="text_ellipsis">{`id:${products._id}`}</p>
            </div>

        </Link>
    )
}
export default ProductCard