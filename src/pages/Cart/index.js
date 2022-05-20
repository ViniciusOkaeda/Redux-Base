import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { FiPlusCircle, FiMinusCircle, FiXCircle, FiTruck } from 'react-icons/fi'
 
import * as CartActions from '../../store/modules/cart/actions';
import './styles.css';
 
export default function Cart() {

  //  A constante cart vai coletar todos os nossos itens armazenados na store da cart
  // e vamos utilizar o método map para calcular o subtotal de cada item
 const cart = useSelector(state =>
   state.cart.map(product => ({
     ...product,
     subtotal: product.sellingPrice * product.amount,
   }))
 );
 
 // A constante total irá calcular o valor total de todos os itens do carrinho.
 const total = useSelector(state =>
   state.cart.reduce((totalSum, product) => {
     return totalSum + product.sellingPrice * product.amount;
   }, 0)
 );


 
 const dispatch = useDispatch();
 
 // A função increment é responsável por adicionar mais um a quantidade
 //do item do carrinho.
 // É NECESSÁRIO passar a quantidade e o id do produto para a payload da action
 // updateAmount
 function increment(product) {
   dispatch(CartActions.updateAmount({
     id: product.id,
     amount: product.amount + 1,
   }));
 }
 
// A função decrement é responsável por subtrair um da quantidade
//de itens do carrinho.
 // É NECESSÁRIO passar a quantidade e o id do produto para a payload da action
 // updateAmount
 function decrement(product) {
   dispatch(CartActions.updateAmount({
     id: product.id,
     amount: product.amount - 1,
   }));
 }
 
 return (
   <main className="container">
     <div className="bag-container">
       <table className="product-table">
         <thead>
           <tr>
             <th />
             <th>Meus Produtos</th>
             <th>Quantidade</th>
             <th>Subtotal</th>
             <th />
           </tr>
         </thead>
         <tbody>
           {cart.map(product => (
             <tr key={product.id}>
               <td>
                 <img src={product.imageUrl} alt={product.name} />
               </td>
               <td>
                 <strong>{product.name}</strong>
                 <span> {product.sellingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
               </td>
               <td>
                 <div>
                   <button type="button" onClick={() => decrement(product)}>
                     <FiMinusCircle size={20} color="#33BFCB" />
                   </button>
                   <input type="number" readOnly value={product.amount} />
                   <button type="button" onClick={() => increment(product)}>
                     <FiPlusCircle size={20} color="#33BFCB" />
                   </button>
                 </div>
               </td>
               <td>
                 <strong> {product.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
               </td>
               <td>
                 <button
                   type="button"
                   onClick={() => dispatch(CartActions.removeFromCart(product.id))}
                 >
                   <FiXCircle size={20} color="#33BFCB" />
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
 
       <footer>
         <button type="button">Encomendar</button>
         {total > 10 ? <span className='frete'><FiTruck size={40} color="#333333" /> <p className='freteColor'>Frete gratis incluso!</p></span> : ''}

 
         <div className="total">
           <span>Total</span>
           <strong> {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>

         </div>
       </footer>
     </div>
   </main>
 );
}