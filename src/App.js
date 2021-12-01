import React from 'react';
 
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
 
import Rotas from './routes';
import Header from './components/Header';
 
import store from './store';
 
function App() {
 return (
   <Provider store={store}>
     <BrowserRouter>
       <Header />
       <Rotas />
     </BrowserRouter>
   </Provider>
 );
}
 
export default App;