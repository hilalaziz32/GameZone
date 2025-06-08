'use client'
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      width: '100%',
      padding: '1rem 2rem',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      background: '#fff'
    }}>
      <Link href="/auth/signin" style={{marginRight: '1rem'}}>Login</Link>
      <Link href="/auth/signup">
        <button style={{padding: '0.5rem 1rem', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px'}}>
          Sign Up
        </button>
      </Link>
    </nav>
  );
}
