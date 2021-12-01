import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { FiShoppingBag } from 'react-icons/fi';
 
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
 
import './styles.css';
 
export default function Home() {
 const [books, setBooks] = useState([]);

 //useSelector recupera dados da store.
 //A constante amount utiliza o useSelector justamente para obter os dados da store,
 // especificamente do cart, ou seja, do carrinho e vai armazenar a quantidade de cada item.
 const amount = useSelector(state =>
   state.cart.reduce((sumAmount, book) => {
     sumAmount[book.id] = book.amount;
 
     return sumAmount;
   }, {})
 );
 
 // useDispatch faz a chamada de uma action
 const dispatch = useDispatch();
 
 useEffect(() => {
   async function loadBooks() {
     const response = await api.get('/books');
 
     setBooks(response.data);
   }
 
   loadBooks();
 }, []);
 
 //Com o dispatch criado( que é quem dispara as actions), foi criada a 
 //function handleAddProduct que recebe todos os dados do livro e chama
 // a action addToCart passando os dados do livro como payload.
 function handleAddProduct(book) {
   dispatch(CartActions.addToCart(book));
 }
 
 return (
   <main className="container">
     <ul className="book-catalog">
       {books.map(book => (
         <li key={book.id} className="book-container">
           <img src={book.image} alt={book.title} />
           <strong>{book.title}</strong>
           <span>R$ {book.price}</span>

          {/* Este button com o handle e amount serve para substituir o valor 0 estático
          da quantidade de cada livro no carrinho, por um valor dinâmico baseado no id do livro. 
          
          Ao clicar, irá adicionar um livro ao nosso carrinho e automaticamente o
          amount será recarregado mostrando a quantidade atual do livro
          
          Após os proximos cliques no mesmo produto ele vai incrementar a quantidade.*/}
           <button type="button" onClick={() => handleAddProduct(book)}>
             <div>
               <FiShoppingBag size={16} color="#33BFCB" />{' '}
               {amount[book.id] || 0}
             </div>
 
             <span>Adiconar</span>
           </button>
         </li>
       ))}
     </ul>
   </main>
 );
}