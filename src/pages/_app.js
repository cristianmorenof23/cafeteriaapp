import '@/styles/globals.css'
import '@/styles/estilos.css'
import { CafeteriaProvider } from 'context/CafeteriaProvider'


export default function App({ Component, pageProps }) {
  return (
    <CafeteriaProvider>
      <Component {...pageProps} />
    </CafeteriaProvider>
  )
}
