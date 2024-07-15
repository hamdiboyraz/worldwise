import {createContext, useCallback, useContext, useEffect, useReducer} from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            };
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            };
        case 'cities/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            };
        case 'cities/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {}
            };
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            throw new Error('Unknown action type');
    }
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        async function fetchCities() {
            dispatch({type: 'loading'});
            try {
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                dispatch({type: 'cities/loaded', payload: data});
            } catch (error) {
                dispatch({type: 'rejected', payload: 'Error fetching cities'});
            }
        }

        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) == currentCity.id) return;
            dispatch({type: 'loading'});
            try {
                const response = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await response.json();
                dispatch({type: 'city/loaded', payload: data});
            } catch (error) {
                dispatch({type: 'rejected', payload: 'Error fetching a city'});
            }
        }, [currentCity.id]);

    async function createCity(newCity) {
        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity)
            });
            const data = await response.json();
            dispatch({type: 'cities/created', payload: data});
        } catch (error) {
            dispatch({type: 'rejected', payload: 'Error creating a city'});
        }
    }

    async function deleteCity(id) {
        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'POST'
            });
            dispatch({type: 'cities/deleted', payload: id});
        } catch (error) {
            dispatch({type: 'rejected', payload: 'Error deleting a city'});
        }
    }

    return (
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity, deleteCity, error}}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (!context) {
        throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
}

export {CitiesProvider, useCities};
