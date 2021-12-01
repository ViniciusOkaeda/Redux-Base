import React from 'react';
import {Routes, Route, } from "react-router-dom";
 
import Home from './pages/Home';
import Cart from './pages/Cart';
 
export default function Rotas() {
 return (
   <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
   </Routes>
 );
}