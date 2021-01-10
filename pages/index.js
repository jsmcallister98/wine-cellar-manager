/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import Head from 'next/head'
import { useColorMode } from "theme-ui";

export default function Home() {

  const [colorMode, setColorMode] = useColorMode();

  return (
    <Flex sx={colorMode === 'default' ? { 
              background: 'url(/images/wineoh1.jpg)',
               width: '100%',
               height: '100vh',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               justifyContent: 'center',
               alignItems: 'center',
               } : {
               background: 'url(/images/wineoh2.jpg) no-repeat center center fixed',
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
