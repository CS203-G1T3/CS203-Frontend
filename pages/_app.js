import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';


function MyApp({ Component, pageProps }) {

    axios.defaults.baseURL = "http://localhost:8080"

    return(
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    ) 
}

export default MyApp
