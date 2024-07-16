import './App.css';

import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router } from "react-router-dom"
import Footer from './component/layout/Footer/Footer.js';
import { Route, Routes } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import React from 'react';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
function App() {
  const { user, isAuthenticated } = useSelector(state => state.userReducer)
  console.log(user)
  useEffect(() => {
    store.dispatch(loadUser())

  }, [])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signUp' element={<SignUp />} />
        <Route exact path='/account'
          element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
          }
        />
        <Route exact path='/me/update'
          element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <UpdateProfile />
          </ProtectedRoute>
          }
        />
        <Route exact path='/password/update'
          element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <UpdatePassword />
          </ProtectedRoute>
          }
        />
          <Route exact path='/password/forgot'
          element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <ForgotPassword />
          </ProtectedRoute>
          }
        />

        {/* {isAuthenticated &&<Route exact path='/account' element={<Profile/>}/>} */}


        <Route exact path='/search' element={<Search />} />



      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
