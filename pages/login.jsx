import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../Forms/LoginForm';
import { CodeIcon } from '@heroicons/react/solid'


function LogIn () {
    return (
        <div className="flex w-all h-screen">
            <Head>
            <title>Log In</title>
            {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <div className="flex flex-col">
                <div className="absolute flex">
                    <Link href="/">
                        <button className="flex px-32 pt-16 text-3xl items-center text-blue-600">
                            <CodeIcon className="h-10 mx-2" />
                            <h1>TRAIL</h1>
                        </button>
                    </Link>
                </div>

                <div className="flex items-center h-full">
                    <div className="flex flex-col p-32"> 
                        <h1 className="text-4xl ">Log in </h1>
                        <p className="py-3">Business Portal Log In</p>
                        <LoginForm />
                        <div className="flex items-center">
                            <p className="py-3 mr-1">Not yet a member?</p>
                            <a href="/signup" className="underline">Sign up</a>
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex">
                <div className="absolute p-4 flex flex-col h-full bg-black bg-opacity-30">  
                    <div className="p-20 flex flex-col justify-around h-full">
                        <div>
                            <p className="text-xl text-white">The Road Ahead Is Lee Hsien Loong</p>
                            <h1 className="text-9xl text-bold text-white">TRAIL.sg</h1>
                        </div>
                        <p className="text-xl text-white">
                            The ultimate companion for businesses, TRAIL is a website offering support
                            for hard hit businesses during the COVID-19 pandemic. TRAIL aims to be the
                            one stop solution for your business in this challenging times. Find updated
                            guidelines, discover support and plan ahead for the future with TRAIL!
                        </p>
                    </div>
                </div>
                <img className="object-cover h-screen" src="/LHL.jpeg" alt="Log in cover" />
            </div>            
        </div>
    )
}

export default LogIn