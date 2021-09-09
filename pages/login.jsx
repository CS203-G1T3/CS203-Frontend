import Head from 'next/head'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoginForm from '../Forms/LoginForm';


function LogIn () {
    return (
        <div className="flex w-all h-screen">
            <Head>
            <title>Log In</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col p-16 bg-white items-center"> 
                <h1 className="text-4xl">Log In Now </h1>
                <LoginForm />
            </div>

            <div className="flex">
                <div className="absolute p-4 flex flex-col h-full w-full bg-black bg-opacity-30">  
                    <div className="p-20 w-2/3">
                        <p className="text-xl text-white">The Road Ahead Is Long</p>
                        <h1 className="text-9xl text-bold text-white">TRAIL.sg</h1>
                        <p className="text-xl mt-64 text-white">The ultimate companion for businesses, TRAIL is a website offering support for hard hit businesses during the COVID-19 pandemic</p>
                    </div>
                </div>
                <img className="object-cover h-screen" src="/LHL.jpeg" alt="Log in cover" />
            </div>
            
        </div>
    )
}

export default LogIn