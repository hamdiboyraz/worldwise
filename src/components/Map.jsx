import styles from './Map.module.css';
import { useSearchParams } from 'react-router-dom';

function Map() {

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    return (
        <div className={styles.mapContainer}>
            <h2>Map</h2>
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
            <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>Change position</button>
        </div>
    );
}

export default Map;