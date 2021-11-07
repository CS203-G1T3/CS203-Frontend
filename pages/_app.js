import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {

    axios.defaults.baseURL = "https://alb.trailsg.biz"

    return(
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    ) 
}

export default MyApp
