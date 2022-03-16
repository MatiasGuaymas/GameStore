import ItemListContainer from './components/ItemListContainer';
import './App.css';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Error from './components/Error404';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:categoryID" element={<ItemListContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;