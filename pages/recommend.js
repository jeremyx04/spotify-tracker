import { useSession, signIn, signOut } from 'next-auth/react';
import Track from '../components/Track';
import styles from '../styles/Home.module.css'
import Recommend from '../components/Recommend';

export default function RecommendPage() {
    const { data: session,status } = useSession();
    if(status==='authenticated'){
        return(
            <div>
                <Recommend/>
            </div>
        )   
    }
    else{
        return(
            <div className={styles.main}>
                <h1> Spotify Tracker</h1>
                Sign in to see your spotify stats
                <br/> <br/>
                <button onClick={() => signIn('spotify')}> Sign in </button>
            </div>
        )
    }
 
}