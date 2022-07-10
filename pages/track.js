import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Script from 'next/script';

export default function recent() {
    const { data: session,status } = useSession();
    const [ list,setList ] = useState([]);

    async function getRecent(){
        const res = await fetch('/api/top_tracks');
        const { items } = await res.json();
        if(items!=undefined){
            setList(items);
        }
        console.log('eunha');
    }

    if(list.length===0)
        getRecent();

    if(status=="authenticated"){
        return(
            <div>
                <h1 className='recent'> Top Tracks </h1>
                {list.map((items) => (
                    <div>
                        <li className='recentList'> {items.name} - {items.album.artists[0].name} - {items.album.name} </li>
                    </div>
                ))}
            </div>
        )
    }
    if(status=="unauthenticated"){
        return(
            <Script> {signIn('spotify')} </Script>
        )
    }
}