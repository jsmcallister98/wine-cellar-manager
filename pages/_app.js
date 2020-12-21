/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import theme from '../src/theme'
import Navbar from '../src/components/Navbar' 
import ThemeToggle from '../src/components/ThemeToggle'
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/sidebar.scss'
import { Provider } from 'next-auth/client'

export default function App({ Component, pageProps }) {

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <div sx={{ fontFamily: 'Montserrat'}}>
          <Navbar />
          <Component {...pageProps} />
        </div>      
      </ThemeProvider>
    </Provider>
  )
}
