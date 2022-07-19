import { useSession, signIn, signOut } from 'next-auth/react';
import Track from '../components/Track';

export default function track() {
    const { data: session,status } = useSession();

    if(status=='unauthenticated'){
        return(
            <div>
              <button onClick={()=>signIn('spotify')}>sign in</button>
            </div>
        )
    }
    if(status=='authenticated'){
        return(
            <div>
                <h1 className='recent'> Top Tracks </h1>
                <Track />
            </div>
        )   
    }
 
}