import { useSession, signIn, signOut } from 'next-auth/react';
import Artist from '../components/Artist';

export default function artist() {
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
                <h1 className='recent'> Top Artists </h1>
                <Artist />
            </div>
        )   
    }
 
}