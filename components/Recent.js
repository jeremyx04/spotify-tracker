import useSWR from 'swr';
import styles from './list.module.css';
import Link from 'next/link';

export default function Recent(recent) {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data, error } = useSWR('api/recently-played',fetcher);

    if(!data)
        return null;

    return (
        <>
        <h1 className='recent'> 
            Recently Played
            <br />
            <a className='subtext'> Your recently played tracks </a>
        </h1>
        <div className={styles.list}>
            <ul>
                {data.map((track) => (
                    <div key = {track.url}>
                        <li>
                            <img src={track.image}/>
                            <span>{track.title}</span>
                            <span>{track.artist}</span>
                            <span>
                            {track.played_at.hour}:{track.played_at.minute} {track.played_at.time}
                            <br/>
                            {track.played_at.year}-{track.played_at.month}-{track.played_at.day}
                            </span> 
                        </li>
                    </div>
                ))}
            </ul>
        </div>
        </>
    )
}