import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./loginSignup.css"
import { login, clearError, loadUser } from "../../actions/userAction"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
// import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom"
const Login = () => {
    const location=useLocation()
    const { error, loading, isAuthenticated } = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const redirect=location.search?location.search.split("=")[1]:"/account"
console.log(error, loading, isAuthenticated );
    useEffect(() => {
        if (error) {
            toast(error)
            // alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            alert.success("Login Success")
            // navigate(redirect)
            dispatch(loadUser())
             navigate("/account")


        }

    }, [alert, error, dispatch, navigate, isAuthenticated, loading,redirect])
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
        // Cookies.set('usercookies', cookies, { expires: 7 });
        // Cookies.set("usercookies",);
        // localStorage.setItem('usercookies', cookies);
        // toast("Login successfully")

        // navigate("/")


    }



    return (
        <React.Fragment>
            <div className="login_signup_container">
                <div className="login_signup_box">

                    <form className="loginform" onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <input
                                type="email"
                                placeholder="email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />

                        </div>
                        <div className="login_register_forgot_div">
                            <Link to="/password/forgot">Forgot Password?</Link>

                        </div>
                        <div className="login_register_forgot_div">

                            <Link to="/signup">Dont't have an account Register</Link>
                        </div>

                        <input type="submit" value="Login" className="loginBtn" />

                    </form>


                </div>

            </div>
        </React.Fragment>
    )
}
export default Login