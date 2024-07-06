import styles from './CountryList.module.css';
import _ from 'lodash';

import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import CountryItem from './CountryItem.jsx';

function getCountries(arr) {
    let unique = new Map();

    arr.forEach((obj) => {
        unique.set(obj.country, { country: obj.country, emoji: obj.emoji });
    });
    return Array.from(unique.values());
}

function CountryList({ cities, isLoading }) {
    if (isLoading) return (<Spinner />);
    if (!cities.length) return (<Message message='Add your first city by clicking on a city on the map' />);

    // using lodash
    // const uniqueCountries = _.uniqBy(cities, 'country');
    // console.log('uniqueCountries', uniqueCountries);

    // using Map
    const countries = getCountries(cities);

    return (
        <ul className={styles.countryList}>
            {countries.map(country => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    );
}

export default CountryList;