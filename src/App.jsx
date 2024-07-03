import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {
    console.log('App component');
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/product' element={<Product />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;