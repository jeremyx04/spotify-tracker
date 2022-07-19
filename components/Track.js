import useSWR from 'swr';
import styles from './list.module.css';
import Link from 'next/link';

export default function Track(track) {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data, error } = useSWR('api/top-tracks',fetcher);

    if(!data)
        return null;

    return (
        <div className={styles.list}>
            <ul>
                {data.tracks.map((track) => (
                    <div key = {track.track_url}>
                        <li>
                            <img src={track.image}/>
                            
                                <Link href={track.track_url}>
                                    <span>{track.title}</span>
                                </Link>
                                <Link href={track.artist_url}>
                                    <span>{track.artist}</span>
                                </Link>
                                <Link href={track.album_url}>
                                    <span>{track.album}</span>
                                </Link>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}