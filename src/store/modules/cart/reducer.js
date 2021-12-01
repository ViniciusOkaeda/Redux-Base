import { createReducer } from '@reduxjs/toolkit';
import {
 addToCart,
 removeFromCart,
 updateAmount,
} from './actions';
 
//Aqui é necessário importar nossas actions.

//A função createReducer, permite criar o reducer em si, recebendo 2 parâmetros.
//O primeiro é o estado inicial, ou seja, assim que a aplicação for iniciada, ele vai popular o state com esses dados.
//O segundo é um objeto que conterá a nossa lógica de negócio para cada uma das actions.
// Deverá passar a action como chave [] e como valor (), uma função que recebe state e action.
//O state vem com os dados da nossa store e o action contem os dados da nossa action com os atributos type e o payload.
const cart = createReducer([], {


// ---------------- Análise deste bloco -------------------------

//Nele extraímos o payload da action e extraímos o id do item de carrinho que deverá ser adicionado.
//Em seguida vamos tentar buscar na store se já existe esse item.
//Caso ele exista, vamos apenas incrementar a quantidade dele no carrinho.
//Caso ele ainda não exista, vamos adicionar o campo amount com quantidade 1 e adiciona-lo à store.
//Note que, apesar de o state representar a store, que é imutável, podemos modifica-la como um objeto ou array qualquer e após isso será automaticamente alterado o estado global.
//Isso ocorre, pois o Redux Toolkit faz a mágica por baixo do panos, facilitando nossa vida em modificar um estado imutável, sem precisarmos recorrer a técnicas de desestruturação, que podem se tornar um verdadeiro desafio dependendo do caso.
 
[addToCart]: (state, action) => {
//É através do payload que vamos pegar os dados passados pelo component.

   const { payload } = action;
   const { id } = payload;
 
   const bookExists = state.find(book => book.id === id);
  
   if (bookExists) {
     bookExists.amount = bookExists.amount + 1;
   } else {
     payload.amount = 1;
     state.push(payload);
   }
 },
// ---------------- Fim análise -----------------------

 [removeFromCart]: (state, action) => {
   const productIndex = state.findIndex(book => book.id === action.payload);
 
   if (productIndex >= 0) {
     state.splice(productIndex, 1);
   }
 },

 [updateAmount]: (state, action) => {
   const { id, amount } = action.payload;
   const bookExists = state.find(book => book.id === id);
 
   if (bookExists) {
     console.log(action.payload)
     const bookIndex = state.findIndex(book => book.id === bookExists.id);
 
     if (bookIndex >= 0 && amount >= 0) {
       state[bookIndex].amount = Number(amount);
     }
   }
 
   return state;
 },
});
 
export default cart