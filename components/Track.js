import useSWR from 'swr';
import styles from './list.module.css';
import Link from 'next/link';   
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Track(track) {
    const router = useRouter();
    const fetcher = (url) => fetch(url).then((r) => r.json());
    let time_range = router.query.time;
    if(!time_range){
        time_range = 'medium_term';
    }
    const { data, error } = useSWR(`api/top-tracks?time=${time_range}`,fetcher);
    const update = () => {
        let select = document.getElementById('time');
        let value = select.options[select.selectedIndex].value;
        if(value === '1'){
            window.location.href = '/track/?time=medium_term';
        }
        else if(value === '2'){
            window.location.href = '/track/?time=short_term';
        }
        else if(value === '3'){
            window.location.href = '/track/?time=long_term';
        }
    }
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
            Top Tracks
            <br/>
            <a className='subtext'> Your most listened to songs </a>
            <div className='center'> 
                <select id='time' className='dropdown' onChange={()=>update()}>
                    <option id='medium_term' value='1'>Last 6 Months</option>
                    <option id='short_term' value='2'>Last 4 Weeks</option>
                    <option id='long_term' value='3'>All Time</option>
                </select>
            </div>
        </h1>
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
        </>
    )
}