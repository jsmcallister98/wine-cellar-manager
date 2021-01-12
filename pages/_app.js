/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import theme from '../src/theme'
import Navbar from '../src/components/Navbar' 
import Footer from '../src/components/Footer' 
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/sidebar.scss'

export default function App({ Component, pageProps }) {

  return (
      <ThemeProvider theme={theme}>
        <div sx={{ fontFamily: 'Montserrat'}}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>      
      </ThemeProvider>
  )
}
