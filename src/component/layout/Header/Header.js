import {ReactNavbar} from "overlay-navbar";
import ecommerc_log from "../../../images/ecommerc_log.png"
import { FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import WebFont from "webfontloader"
import React from "react";
const Header=()=>{
    React.useEffect(()=>{
     WebFont.load({
        google:{
            families:["Roboto","Drold Sans","Chilanka"]
        }
     })
    },[])
    return(
        <ReactNavbar
        profileIcon={true} ProfileIconElement={FaUserAlt}
        searchIcon={true} SearchIconElement={CiSearch}
        cartIcon={true} CartIconElement={CiShoppingCart}
        profileIconSize="2vmax"
        searchIconSize="2vmax"
        cartIconSize="2vmax"
        burgerColorHover="#eb4034"
        burgerColor="#707070"

        logo={ecommerc_log}
        logoWidth="10vmax"
        navColor1="white"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4url="/about"
        profileIconUrl="/login"
        link1Size="1.3vmax"
        link1Color="rgba(35,35,35,0.8)"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="#eb4034"
        link1Margin="1vmax"
        profileIconColor="rgba(35,35,35,0.8)"
        searchIconColor="rgba(35,35,35,0.8)"
        cartIconColor="rgba(35,35,35,0.8)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
        padding="auto"
        />
    )
}
export default Header;