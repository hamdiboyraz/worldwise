import { createContext, useEffect, useState } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {
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
        <CitiesContext.Provider value={{ cities, isLoading }}>
            {children}
        </CitiesContext.Provider>
    );
}

export { CitiesProvider, CitiesContext };