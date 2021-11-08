import Head from 'next/head'
import Link from 'next/link'
import { CodeIcon } from '@heroicons/react/solid'
import { Carousel } from 'antd';


export default function Home() {
  return (
    <div className="flex flex-col h-screen font-Inter">
      <Head>
        <title>trailbiz.sg</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" w-screen h-full p-8 px-20 bg-white">

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
                        <button className="hover:text-blue-500"> Features </button> 
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
                    <Link href="/signup"> 
                        <button className="flex bg-blue-500 text-white p-2 rounded-lg items-center"> Get Started </button> 
                    </Link>
                </div>
            </div>

            <div className="flex justify-center w-full pt-8 items-end">
                
                <div className="flex w-1/4 flex-col text-justify h-full pb-12">
                    <span className="text-6xl font-bold">An app for businesses.</span>
                    <span className="my-8">Join us at trailsg.biz as we strive to make a difference for businesses heavily hit by the pandemic.</span>
                    <div className="flex">
                        <Link href="/login"> 
                        <button className="flex bg-blue-500 text-white p-2 mr-2 rounded-lg items-center"> Business Log In </button> 
                        </Link>
                        <Link href="/admin/login"> 
                            <button className="flex border-2 p-2 mx-2 rounded-lg items-center"> Admin Log In </button> 
                        </Link>
                    </div>
                </div>

                <div className="flex pt-2 justify-center items-center w-3/4 h-full">
                    <div className="w-3/4">
                        <Carousel autoplay draggable>
                            <div>
                                <img className="h-auto" src="/collaboration_resized.jpg" alt="wfe" />
                            </div>
                            <div>
                                <img src="/vaccine-poster.jpg" alt="wfe" />
                            </div>
                            <div>
                                <img src="/sg_gbtb.jpg" alt="wef" />
                            </div>
                        </Carousel>
                    </div>

                </div>
            </div>
            
    
      </main>

      <footer className="border-t">
        <a
          className="h-full flex items-center justify-center"
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
