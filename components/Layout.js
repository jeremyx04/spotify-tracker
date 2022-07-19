import styles from './layout.module.css'
import Link from 'next/link'

export default function Layout({ children }){ 
    return(
        <>
            <nav className={styles.navbar}>
                <ul>
                    <Link href='/'>
                        <li><a> Spotify Tracker </a></li>
                    </Link> 
                    <Link href='/track'>
                        <li><a> Top Tracks </a></li>
                    </Link>
                    <Link href='/artist'>
                        <li><a> Top Artists </a></li>
                    </Link>
                    <Link href='/recent'> 
                        <li><a> Recently Played </a></li>
                    </Link> 
                </ul>
            </nav>
            <main> {children} </main>
        </>
    )
}