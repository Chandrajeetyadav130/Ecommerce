import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../../actions/userAction"
import {useSelector,useDispatch} from "react-redux"
import { toast } from 'react-toastify';
import { clearError } from "../../actions/userAction";
import "./loginSignup.css"
const SignUp = () => {
    const navigate=useNavigate()
    const {isAuthenticated,error}=useSelector(state=>state.userReducer)
    const dispatch=useDispatch()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png")
    const { name, email, password } = user
      useEffect(()=>{
          if(error){
            toast(error)
            dispatch(clearError())
          }
        //   if(isAuthenticated){
        //     // toast("Register Successfully")
        //     navigate("/login")
    
        //    }
      },[navigate,isAuthenticated,dispatch,error])
    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        dispatch(register(myForm))
        console.log("signup submit");
    }
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
 

    return (
        <React.Fragment>
            <div className="login_signup_container">
                <div className="login_signup_box">


                    <form
                        className="signUpForm"
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName" id="signup_input_padding">
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail" id="signup_input_padding">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />

                        </div>
                        <div className="signUpPassword" id="signup_input_padding">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />

                        </div>
                        <div id="registeImage">
                            <img src={avatarPreview} alt="not avilable" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}

                            />

                        </div>
                        <input
                            type="submit"
                            value="Register"
                            className="signupBtn"
                        />
                    <Link to="/login">If you already have an account login.</Link>

                    </form>
                </div>

            </div>
        </React.Fragment>
    )
}
export default SignUp