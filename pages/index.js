import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Index() {
  const { data: session,status } = useSession();
  if(status === 'authenticated'){
    return (
      <div className={styles.main}>
        <h1> Spotify Tracker</h1>
        Signed in as {session?.token?.name}
        <br/> <br/>
        <button onClick={() => signOut()}> Sign out</button>
      </div>
    )
  }
  if(status === 'unauthenticated'){
    return (
      <div className={styles.main}>
        <h1> Spotify Tracker</h1>
        Sign in to see your spotify stats
        <br/> <br/>
        <button onClick={() => signIn('spotify')}> Sign in </button>
      </div>
    )
  }
}
