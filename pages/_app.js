import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="Self Regulator" content="Small habit daily return huge result over the long term" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap" rel="stylesheet" />    
      </Head>

      <nav className="py-4 px-12 border-b border-gray-300">
        <Link href="/">
          <a>Home</a> 
        </Link>

        <Link href="/profile">
          <a className="ml-4">Profile</a> 
        </Link>

        <Link href="/protected">
          <a className="ml-4">Protected</a> 
        </Link>
      </nav>

      <body className="font-mono">
        <Component {...pageProps} />
      </body>
    </>
  )
}

export default MyApp