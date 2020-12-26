/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import Head from 'next/head'
import { useColorMode } from "theme-ui";

export default function Home() {

  const [colorMode, setColorMode] = useColorMode();

  return (
    <Flex sx={colorMode === 'default' ? { 
              background: 'url(https://images.unsplash.com/photo-1575810370831-5dce00166722?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)',
               width: '100%',
               height: '100vh',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               justifyContent: 'center',
               alignItems: 'center',
               } : {
               background: 'url(https://images.unsplash.com/photo-1464517501149-a16c588f4f76?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1287&q=80) no-repeat center center fixed',
               backgroundSize: 'cover',
               justifyContent: 'center',
               height: '100vh',
               alignItems: 'center',
               marginTop: -69
      }}>
      <Head>
        <title>WineOh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex sx={colorMode === 'default' ? { 
                flexDirection: 'column',
                textAlign: 'center',
                mt: -250
                } : {
                flexDirection: 'column',
                textAlign: 'center',
                mt: -128
        }}>
        <h1 sx={{ fontSize: [5, 6, 7, 7], fontWeight: 'semiBold' }}> Welcome To WineOh </h1>
        <p sx={{ fontSize: [2, 2, 3] }}> The easiest way to keep track of your favorite wines. </p>
      </Flex>
    </Flex>
  )
}
