import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Login from './pages/Login.jsx';

function App() {
    console.log('App component');
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/product' element={<Product />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/app' element={<AppLayout />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;