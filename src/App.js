import './App.css';

import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router } from "react-router-dom"
import Footer from './component/layout/Footer/Footer.js';
import { Route,Routes } from 'react-router-dom';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js"
import Search from './component/Product/Search.js';
import Login from "./component/User/Login.js"
import SignUp from './component/User/SignUp.js';
import store from "./store.js"
import { loadUser } from './actions/userAction.js';
import { useEffect } from 'react';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector,useDispatch } from 'react-redux';
function App() {
  const {user,isAuthenticated}=useSelector(state=>state.userReducer)
  console.log(user)
  useEffect(()=>{
  store.dispatch(loadUser())

  },[])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/product/:id' Component={ProductDetails}/>
      <Route exact path='/products' Component={Products}/>
      <Route  path='/products/:keyword' Component={Products}/>
      <Route exact path='/login' Component={Login}/>
      <Route exact path='/signUp' Component={SignUp}/>



      <Route exact path='/search' Component={Search}/>



      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
