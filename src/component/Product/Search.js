import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import "./Search.css"
import MetaData from "../layout/MetaData"
const Search=()=>{
    const navigate=useNavigate()
    const [keyword,setKeyword]=useState("")
    const searchSubmitHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
          navigate(`/products`)
        }
    }
    return(
        <React.Fragment>
            <MetaData title="Search a product"/>
            <form className="searhBox" onSubmit={searchSubmitHandler}>
              <input type="text" placeholder="search a product" onChange={(e)=>setKeyword(e.target.value)}/>
              <input type="submit" value="search"/>
            </form>
        </React.Fragment>
    )
}
export default Search