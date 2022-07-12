import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
      <Script src="node_modules/flowbite/dist/flowbite.js" />
      </Head>
      <body className='bg-imgbg bg-no-repeat bg-cover'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}