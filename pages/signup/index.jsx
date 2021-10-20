import Head from 'next/head'
import Link from 'next/link'
import { CodeIcon } from '@heroicons/react/solid'
import Signupform from '../../Forms/SignupForm';

function Signup() {
    return (
        <div className="flex h-screen">
            <Head>
            <title>Sign Up</title>
            {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <div className="flex flex-col w-1/3">
                <div className="absolute flex">
                    <Link href="/">
                        <button className="flex px-16 pt-16 text-3xl items-center">
                            <CodeIcon className="h-10 mx-2 text-blue-600" />
                            TRAIL
                        </button>
                    </Link>
                </div>

                <div className="flex items-center h-full">
                    <div className="flex flex-col pl-16"> 
                        <h1 className="text-4xl ">Sign up </h1>
                        <p className="py-3">Create a new business account</p>
                        <Signupform />
                        <div className="flex my-3">
                            <p className="mr-1">Already have an account?</p>
                            <a href="/login" className="underline">Log in</a>
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

export default Signup