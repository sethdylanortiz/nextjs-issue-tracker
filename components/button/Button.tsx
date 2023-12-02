import React from 'react';
import styles from './button.module.css';
import Link from 'next/link';

const Button = (text:string, url:string) => {
    return 
    (
        <Link href = {url}>
            <div className = {styles.container}>{text}</div>
        </Link>
    )
}

export default Button;