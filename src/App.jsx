import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Login from './pages/Login.jsx';
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';

const BASE_URL = 'http://localhost:8000';

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function() {
        async function fethCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                setCities(data);
                setIsLoading(false);
            } catch (error) {
                alert('Error fetching cities', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }

        fethCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path='/product' element={<Product />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/app' element={<AppLayout />}>
                    <Route index element={<Navigate replace to='cities' />} />
                    <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path='cities/:id' element={<City />} />
                    <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
                    <Route path='form' element={<Form />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;