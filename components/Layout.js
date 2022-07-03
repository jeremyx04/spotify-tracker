import styles from './layout.module.css'
import Link from 'next/link'

export default function Layout({ children }){ 
    return(
        <>
            <nav className={styles.navbar}>
                <ul>
                    <Link href='/'>
                        <li><a>Spotify Tracker</a></li>
                    </Link> 
                    <Link href='/'> 
                        <li><a>test2</a></li>
                    </Link> 
                </ul>
            </nav>
            <main> {children} </main>
        </>
    )
}