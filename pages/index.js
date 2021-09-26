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

      <main className="flex w-full h-full">

        <div className="flex flex-col p-20 w-1/2 bg-yellow-50">
            <Link href="/">
                <button className="flex text-3xl text-blue-600">
                    <CodeIcon className="h-10 mx-2" />
                    <h1>TRAIL</h1>
                </button>
            </Link>

            <h1 className="mt-16 text-5xl font-bold">The Road Ahead Is Long. But we can get there together.</h1>
            <p className="mt-4">Join us at trail.sg as we strive to make a difference for businesses heavily hit by the pandemic.</p>

            <div className="mt-4">
                <Link href="/login">
                    <button className="flex bg-blue-500 text-white p-2 rounded-md"> Business Portal Log In</button>
                </Link>
            </div>
            
        </div>

        <div className="flex flex-col w-1/2 h-full bg-yellow-300 ">
            <div className="p-20 flex justify-around w-full">
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

            <div className="flex h-full w-10/12 bg-black">
            <img className="object-cover" src="/sg_kids.jpeg" alt="Log in cover" />
            </div>

        </div>
    
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
