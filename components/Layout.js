import styles from './layout.module.css'
import Link from 'next/link'

export default function Layout({ children }){ 
    return(
        <>
            <nav className={styles.navbar}>
                <ul>
                    <Link href='/'>
                        <li><a className='hover-underline-animation'> Spotify Tracker </a></li>
                    </Link> 
                    <Link href='/track'>
                        <li><a className='hover-underline-animation'> Top Tracks </a></li>
                    </Link>
                    <Link href='/artist'>
                        <li><a className='hover-underline-animation'> Top Artists </a></li>
                    </Link>
                    <Link href='/recent'> 
                        <li><a className='hover-underline-animation'> Recently Played </a></li>
                    </Link> 
                    <Link href='/recommend'> 
                        <li><a className='hover-underline-animation'> Recommended Tracks </a></li>
                    </Link> 
                </ul>
            </nav>
            <main> {children} </main>
        </>
    )
}