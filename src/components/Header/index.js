import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
import { FiShoppingBag, FiBox } from 'react-icons/fi';
import './styles.css';
 
import logo from '../../assets/book.png';
 
export default function Header() {;
  // Ao importar o useSelector é possível exibir os dados, com isso
  //podemos utilizar a constante cartSize que vai calcular a quantidade total
  // de itens dentro do state.cart
  //Sempre que um livro for adicionado ou removido, a quantidade no Header
  // Será alterada.
 const cartSize = useSelector(state => state.cart.length);
 return (
   <header className="header">
     <Link to="/" className="logo">
      <FiBox size={36} color="#FFF" />
      <span className="logo-text">CodeBy Store</span>
     </Link>
 
     <Link to="/cart" className="header-cart">
       <div>
         <strong>Sacola</strong>
         <span>
           <strong>{cartSize}</strong> itens
         </span>
       </div>
       <FiShoppingBag size={36} color="#FFF" />
     </Link>
   </header>
 );
}