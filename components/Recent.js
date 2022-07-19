import useSWR from 'swr';
import styles from './list.module.css';
import Link from 'next/link';

export default function Recent(recent) {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data, error } = useSWR('api/recently-played',fetcher);

    if(!data)
        return null;

    return (
        <div className={styles.list}>
            <ul>
                {data.map((track) => (
                    <div key = {track.url}>
                        <li>
                            <img src={track.image}/>
                            <span>{track.title}</span>
                            <span>{track.artist}</span>
                            <span>{track.album}</span>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}