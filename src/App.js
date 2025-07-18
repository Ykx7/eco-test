import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Products from './pages/Products/Products';
import Dashboard from './pages/Dashboard/Dashboard';
import ShowUsers from './pages/Dashboard/User/ShowUsers';
import CreateUsers from './pages/Dashboard/User/CreateUser';
import UpdateUsers from './pages/Dashboard/User/UpdateUser';
import ShowProducts from './pages/Dashboard/Products/ShowProducts';
import CreateProducts from './pages/Dashboard/Products/CreateProducts';
import UpdateProducts from './pages/Dashboard/Products/UpdateProducts';
import { Orders, AcceptedOrders, RefusedOrders } from './pages/Dashboard/Orders/Orders';
import CardProduct from './pages/Products/CardProduct';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route path='/' element={ <Home /> } />
      <Route path='/products' element={ <Products /> } />
      <Route path='/products/:id' element={ <CardProduct /> } />
      <Route path='/cart' element={ < Cart /> } />
      <Route path='/checkout' element={ < Checkout /> } />

      {/* PRIVATE ROUTES */}

        <Route path='/dashboard' element={ <Dashboard /> } >
            <Route path='users' element={ <ShowUsers /> } />
            <Route path='users/create' element={ <CreateUsers /> } />
            <Route path='users/:id' element={ <UpdateUsers /> } />
            <Route path='products' element={ <ShowProducts /> } />
            <Route path='products/create' element={ <CreateProducts /> } />
            <Route path='products/:id' element={ <UpdateProducts /> } />
            <Route path='orders' element={ <Orders /> } />
            <Route path='orders/accepted' element={ <AcceptedOrders /> } />
            <Route path='orders/refused' element={ <RefusedOrders /> } />
        </Route>
      
    </Routes>
  );
}