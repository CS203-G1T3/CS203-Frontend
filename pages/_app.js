import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
    </head>

    // axios.defaults.baseURL = "https://alb.trailsg.biz"
    axios.defaults.baseURL = "http://localhost:8080"


    return(
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    ) 
}

export default MyApp
