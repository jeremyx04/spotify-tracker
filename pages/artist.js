import { useSession, signIn, signOut } from 'next-auth/react';
import Artist from '../components/Artist';
import styles from '../styles/Home.module.css'

export default function artist() {
    const { data: session,status } = useSession();

    if(status==='authenticated'){
        return(
            <div>
                <Artist />
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