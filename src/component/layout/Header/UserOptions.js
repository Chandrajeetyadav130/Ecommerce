import SpeedDial from '@mui/material/SpeedDial';
import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { MdExitToApp } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../../actions/userAction';
import { MdShoppingCart } from "react-icons/md";
import { useDispatch,useSelector } from 'react-redux';
import "./Header.css"
const UserOptions=({user})=>{
    const dispatch=useDispatch()
    const {cartItems}=useSelector(state=>state.cart)
    const navigate=useNavigate()
    const [open,setOpen]=useState(false)
    const options=[
        {icon:<MdListAlt/>,name:"Order",fun:order},
        {icon:<GoPersonFill/>,name:"Profile",fun:account},
        {icon:<MdShoppingCart style={{color:cartItems.length>0?"green":"unset"}}/>,name:`Cart${cartItems.length}`,fun:cart},

        {icon:<MdExitToApp/>,name:"Logout",fun:logoutuser}
    ]
    // console.log(user?.role)
    if(user?.role==="admin"){
        options.unshift({
            icon:<MdDashboard/>,
            name:"dashboard",
            fun:dashboard}

        )
    }
    function dashboard(){
        navigate("/dashboard")
    }
    function order(){
        navigate("/order")
    }
    function account(){
        navigate("/account")
    }
    function cart(){
        navigate("/cart")
    }
    function logoutuser(){
        dispatch(logout())
        toast("Logout successfully")

    }

    return(
        <React.Fragment>
            <SpeedDial
            className='speed_dial'
            ariaLabel="SpeedDial basic example"
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open={open}
            style={{zIndex:"11"}}
            direction='down'
            tooltipOpen={window.innerWidth<600?true:false}
            icon={<img  className='speed_dial_icon' src={user?.avatar.url?user.avatar.url:"/logo192.png"} alt='Profile'/>}
            >
                {options.map((val,id)=>(<SpeedDialAction
                key={id}
                icon={val.icon}
                tooltipTitle={val.name}
                onClick={val.fun}
                />))}
            </SpeedDial>
        </React.Fragment>
    )
}
export default UserOptions