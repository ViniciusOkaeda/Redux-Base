import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import productsData from '../../json/product.json';
 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { FiShoppingBag } from 'react-icons/fi';
 
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
 
import './styles.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 
export default function Home() {
 const [products, setProducts] = useState([{
  items: {
    availability: '',
    id: '',
    imageUrl: '',
    listPrice: '',
    name: '',
    price: '',
    priceValidUntil: '',
    productId: '',
    quantity: '',
    sellingPrice: '',
    skuName: '',
    uniqueId: '',
   }
}]);

const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};


 //useSelector recupera dados da store.
 //A constante amount utiliza o useSelector justamente para obter os dados da store,
 // especificamente do cart, ou seja, do carrinho e vai armazenar a quantidade de cada item.
 const amount = useSelector(state =>
   state.cart.reduce((sumAmount, product) => {
     sumAmount[product.id] = product.amount;
 
     return sumAmount;
   }, {})
 );
 
 // useDispatch faz a chamada de uma action
 const dispatch = useDispatch();
 
 useEffect(() => {
   async function loadItems() { 
    setProducts(productsData);
   }
 
   loadItems();
 }, []);
 
 //Com o dispatch criado( que é quem dispara as actions), foi criada a 
 //function handleAddProduct que recebe todos os dados do livro e chama
 // a action addToCart passando os dados do livro como payload.
 function handleAddProduct(product) {
   dispatch(CartActions.addToCart(product));
   setOpen(true);

 }
 
 return (
   <main className="container">

       {/* */}
     <ul className="book-catalog">
     {productsData.items.map(product => (
       <li key={product.id} className="book-container">
         <img src={product.imageUrl} alt={product.name} />
         <strong>{product.name}</strong>
          <strong className='risco'> De:  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
          <span>Por Apenas: {product.sellingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>


         {/* Este button com o handle e amount serve para substituir o valor 0 estático
          da quantidade de cada produto no carrinho, por um valor dinâmico baseado no id do produto. 
          
          Ao clicar, irá adicionar um produto ao nosso carrinho e automaticamente o
          amount será recarregado mostrando a quantidade atual do livro
          
          Após os proximos cliques no mesmo produto ele vai incrementar a quantidade.*/}
           <button type="button" onClick={() => handleAddProduct(product)
           }>
             <div>
               <FiShoppingBag size={16} color="#33BFCB" />{' '}
               {amount[product.id] || 0}
             </div>
             <span>Adiconar</span>
           </button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Item adicionado a sua sacola!
            </Alert>
          </Snackbar>

       </li>
     ))}
     </ul>
   </main>
 );
}