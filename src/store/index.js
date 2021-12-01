import { configureStore } from '@reduxjs/toolkit'
 
import rootReducer from './modules/rootReducer';

// Para configurar todos os reducers é preciso passar o rootReduce na 
//configStore, caso contrario a estrutura não irá funcionar
//(se houver mais de um reducer)

const store = configureStore({ reducer: rootReducer })
 
export default store;