import useSWR from 'swr';
import styles from './list.module.css';
import Link from 'next/link';   
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Recommend() {
    const router = useRouter();
    const fetcher = (url) => fetch(url).then((r) => r.json());
    let time_range = router.query.time;
    if(!time_range){
        time_range = 'medium_term';
    }
    const { data, error } = useSWR(`api/recommended`,fetcher);
    console.log(data);
    useEffect(() => {
        let range = document.getElementById(time_range);
        if(!range) 
            return;
        range.selected='selected';
    })
    if(!data)
        return null;

    return (
        <>
        <h1 className='recent'> 
            Recommended Tracks
            <br/>
        
            <a className='subtext'> Songs recommended for you </a>
        </h1>

        <div className={styles.list}>
            <ul>
                {data.map((track) => (
                    <div key = {track.track_url}>
                        <li>
                            <img src={track.image} alt=""/>
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
        </>
    )
}