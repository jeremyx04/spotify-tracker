import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Index() {
  const { data: session,status } = useSession();
  if(status === 'authenticated'){
    return (
      <>
        Signed in as {session?.token?.email}
        <br />
        <button onClick={() => signOut()}> Sign out</button>
      </>
    )
  }
  if(status === 'unauthenticated'){
    return (
      <>
        Not logged in.    
        <br />
        <button onClick={() => signIn('spotify')}> Sign in </button>
      </>
    )
  }
}
