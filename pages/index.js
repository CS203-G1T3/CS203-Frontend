import Head from 'next/head'
import Link from 'next/link'
import { CodeIcon } from '@heroicons/react/solid'


export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>trail.sg</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" w-full h-full p-8 px-20 bg-yellow-50">

            <div className="flex justify-between w-all h-6 items-center">
                
                <Link href="/">
                    <button className="flex text-3xl text-bold items-center">
                        <CodeIcon className="h-10 mx-2 text-blue-600" />
                        TRAIL
                    </button>
                </Link>

                <div className="flex justify-around w-full max-w-xl">
                    <Link href="#"> 
                        <button className="hover:text-blue-500"> About Us </button> 
                    </Link>

                    <div className="border-r m-1 border-black"></div>

                    <Link href="#"> 
                        <button className="hover:text-blue-500"> Activities </button> 
                    </Link>

                    <div className="border-r m-1 border-black"></div>

                    <Link href="#"> 
                        <button className="hover:text-blue-500"> Contact Us </button> 
                    </Link>
                </div>

                <div className="flex w-48 justify-around items-center">
                    <Link href="/login"> 
                        <button className="flex mx-4 items-center"> Log In </button> 
                    </Link>
                    <Link href="/admin/login"> 
                        <button className="flex bg-blue-500 text-white p-2 rounded-lg items-center"> Get Started </button> 
                    </Link>
                </div>
            </div>

            <div className="flex justify-center w-full pt-16 items-center">
                <div className="flex max-w-4xl flex-col text-center px-40">
                    <h1 className="text-6xl font-bold">The Road Ahead Is Long. But we can get there together.</h1>
                    <p className="">Join us at trail.sg as we strive to make a difference for businesses heavily hit by the pandemic.</p>
                    <div className="flex justify-center">
                        <Link href="/login"> 
                        <button className="flex bg-blue-500 text-white p-2 m-2 rounded-lg items-center"> Business Portal Log In </button> 
                        </Link>
                        <Link href="/admin/login"> 
                            <button className="flex border-2 p-2 m-2 rounded-lg items-center"> Admin Portal Log In </button> 
                        </Link>
                    </div>
                </div>
            </div>
            
{/*     <div className="flex flex-col w-1/2 h-full bg-yellow-300 ">
            <div className="flex h-full w-10/12 bg-black">
            <img className="object-cover" src="/sg_kids.jpeg" alt="Log in cover" />
            </div>
        </div> */}
    
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://www.credit-suisse.com/sg/en.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/credit_suisse.jpeg" alt="Credit Suisse" className="h-16 ml-2 mb-3" />
        </a>
      </footer>
    </div>
  )
}
