import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Self Regulator</title>
        <meta name="Self Regulator" content="Small habit daily return huge result over the long term" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
        <link rel="icon" href="/favicon.ico" />
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

      <div>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp