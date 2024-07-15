import { Navigate } from "react-router-dom"
const ProtectedRoute=({isAuthenticate,children})=>{
    // const navigate=useNavigate()
    if(isAuthenticate===false){
       return <Navigate to="/login"/>
    }
    return children
}
export default ProtectedRoute