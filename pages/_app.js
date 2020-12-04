/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import theme from '../src/theme'
import Navbar from '../src/components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>      
    </ThemeProvider>
  )
}
