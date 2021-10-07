import Link from 'next/link'
import { AppstoreOutlined } from '@ant-design/icons'
import { SparklesIcon } from '@heroicons/react/solid'

function Navbar () {

    return (
        <div className="flex flex-col w-80 h-full">
            <Link href="/dashboard">
                <button className="flex items-center p-4">
                    <SparklesIcon />
                    <span className="text-indigo-700 ml-2 text-4xl font-bold">
                        TRAIL
                    </span>
                </button>
            </Link>

            <div className="flex flex-col mt-8 border-r-2 h-full pr-1">
                <p className="my-4 pl-4">Find out more about...</p>
                
                <Link href="/dashboard">
                    <button className="flex items-center hover:bg-indigo-100 rounded-lg px-3 w-full py-4">
                        <AppstoreOutlined />
                        <span className="ml-2 text-left">Operating Guidelines</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-indigo-100 px-3 w-full py-4">
                        <AppstoreOutlined />
                        <span className="ml-2 text-left">Employee Management</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-indigo-100 px-3 w-full py-4">
                        <AppstoreOutlined />
                        <span className="ml-2 text-left">Business Forecast</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-indigo-100 px-3 w-full py-4">
                        <AppstoreOutlined />
                        <span className="ml-2 text-left">Risk Assessment</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-indigo-100 px-3 w-full py-4">
                        <AppstoreOutlined />
                        <span className="ml-2 text-left">Grants and Support</span>
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Navbar