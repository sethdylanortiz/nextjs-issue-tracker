"use client";
import React from 'react'
import styles from './navbar.module.css'

// nextjs
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// icons
import bug_icon from '@/public/icon-bug.png';

const Navbar = () => {

    // next.js hook - that returns the current pathname
    // this connects to browser api - therfore, need to make this a client component
    const get_current_path = usePathname();
    console.log(get_current_path); // outputs: "/" or "/issues" on google console output since its csr

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
                    width = {40}
                    height = {40}
                />     
            </Link>
            <ul className = {styles.ul_container}>
                { links.map(link => 
                    <li> 
                        <Link 
                            key = {link.href}
                            className = {`${link.href == get_current_path ? styles.link_selected : styles.link}`} 
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