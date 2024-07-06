import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
        .map(char => String.fromCharCode(char - 127397)
            .toLowerCase())
        .join('');
    return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />);
};

const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, emoji, date, id, position: { lat, lng } } = city;

    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
};

export default CityItem;