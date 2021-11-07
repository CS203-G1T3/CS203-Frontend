import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {

    axios.defaults.baseURL = "https://cs203-alb-754343787.ap-southeast-1.elb.amazonaws.com"

    return(
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    ) 
}

export default MyApp
