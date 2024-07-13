import ReactStars from "react-rating-stars-component";
import ecommerc_log from "../../images/ecommerc_log.png"
const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "green",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review?.rating,
        isHalf: true
    }
    return (
            <div className="reviewCard">
                <img src={ecommerc_log} alt="pic is not found" />
                <h5>{review.name}</h5>
                <p>{review.comment}</p>
                <ReactStars {...options} />
            </div>
    )
}
export default ReviewCard