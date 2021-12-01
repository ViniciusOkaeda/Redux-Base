import { combineReducers } from 'redux';
 
import cart from './cart/reducer';
 
//Para permitir que nossa store possa registrar mais de um reducer, 
//precisamos de uma configuração a mais, para isso foi criado este arquivo que vai centralizar todos os nossos reducers da aplicação.
//Bastando utilizar o método combineReducers para adicionar todos os nossos reducers que vamos utilizar.

export default combineReducers({
   cart,
});