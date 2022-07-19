import useSWR from 'swr';
import styles from './list.module.css';
import Link from 'next/link';

export default function Artist(artist) {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data, error } = useSWR('api/top-artists',fetcher);

    if(!data)
        return null;

    return (
        <div className={styles.list}>
            <ul>
                {data.map((artist) => (
                    <div key = {artist.url}>
                        <li>
                            <img src={artist.image}/>
                            {artist.name} 
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}