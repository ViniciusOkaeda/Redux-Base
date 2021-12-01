import { createAction } from '@reduxjs/toolkit';
 
export const addToCart = createAction('cart/add_book');
export const removeFromCart = createAction('cart/remove_book');
export const updateAmount = createAction('cart/update_amount');


// A action é um objeto que disponibiliza uma interface com as 
// possíveis as ações, que os components podem utilizar.