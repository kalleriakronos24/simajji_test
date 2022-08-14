import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/Cart';
import OrderPage from './pages/Order';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/** Auth */}
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/item-page' element={<ItemPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/order' element={<OrderPage/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
