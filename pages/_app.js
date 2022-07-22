// import '../styles/globals.css'
import Head from 'next/head';
import '../styles/index.css'
function MyApp({ Component, pageProps }) {
  return (
    <>      
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
