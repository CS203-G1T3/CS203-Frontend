import Head from 'next/head'
import Link from 'next/link'
import AdminLoginForm from '../../Forms/AdminLoginForm';
import { CodeIcon } from '@heroicons/react/solid'


function AdminLogin () {
    return (
        <div className="flex w-all h-screen">
            <Head>
            <title>Log In</title>
            </Head>

            <div className="flex flex-col">
                <div className="absolute flex">
                    <Link href="/">
                        <button className="flex px-32 pt-16 text-3xl items-center text-blue-600">
                            <CodeIcon className="h-10 mx-2" />
                            <span>TRAIL</span>
                        </button>
                    </Link>
                </div>

                <div className="flex items-center h-full">
                    <div className="flex flex-col p-32"> 
                        <h1 className="text-4xl ">Log in </h1>
                        <p className="py-3">Admin Portal Log In</p>
                        <AdminLoginForm />
                    </div>
                </div>
            </div>
            <div className="flex">
                <img className="object-cover h-screen" src="/sg_kids.jpeg" alt="Log in cover" />
            </div>            
        </div>
    )
}

export default AdminLogin