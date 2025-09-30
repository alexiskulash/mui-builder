import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h1>Welcome</h1>
      <p>A minimal Next.js app with Material UI examples.</p>
      <nav>
        <ul style={{ display: 'grid', gap: 8, listStyle: 'inside' }}>
          <li>
            <Link href="/dashboard">Open Dashboard</Link>
          </li>
          <li>
            <Link href="/material-ui">Material UI component demos</Link>
          </li>
          <li>
            <Link href="/grid">Grid layout demos</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
