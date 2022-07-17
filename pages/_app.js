// import '../styles/globals.css'
import { useRouter } from 'next/router';
import '../styles/index.css'
function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
