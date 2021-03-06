import { useSession, signIn, signOut } from 'next-auth/react';
import Recent from '../components/Recent';

export default function recent() {
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
                <h1 className='recent'> Recently Played </h1>
                <Recent />
            </div>
        )   
    }
 
}