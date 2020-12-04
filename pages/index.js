/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import Head from 'next/head'

export default function Home() {
  return (
    <Flex sx={{ background: 'url(https://images.unsplash.com/photo-1575810370831-5dce00166722?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)',
               width: '100%',
               height: '100vh',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               justifyContent: 'center',
               alignItems: 'center'
               }}>
      <Head>
        <title>Wine App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex sx={{ flexDirection: 'column',
                  textAlign: 'center',
                  mt: -64
                  }}>
        <h1 sx={{ fontSize: [5, 6, 7, 7] }}> Welcome To WineOh </h1>
        <p sx={{ fontSize: 3 }}> The easiest way to keep track of your favorite wines. </p>
      </Flex>
    </Flex>
  )
}
