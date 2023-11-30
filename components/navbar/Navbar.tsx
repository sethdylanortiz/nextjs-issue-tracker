import Link from 'next/link';
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image';

// icons
import bug_icon from '@/public/icon-bug.png';

const Navbar = () => {

    // map out array for dynamic link input
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ];

    return (
        <nav className = {styles.container}>
            <Link href = "/">
                <Image
                    src = {bug_icon}
                    alt = "logo"
                    width = {50}
                    height = {50}
                />
                
            </Link>
            <ul className = {styles.ul_container}>
                { links.map(link => 
                    <li> <Link 
                            key = {link.href}
                            className = {styles.link} 
                            href = {link.href}>{link.label}
                        </Link>
                    </li>
                ) }
                {/* <li> <Link className = {styles.link} href = "/">Dashboard</Link></li>
                <li> <Link className = {styles.link} href = "/issues">Issues</Link></li> */}
            </ul>
        </nav>
  )
}

export default Navbar;