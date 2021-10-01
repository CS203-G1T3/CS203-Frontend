import Link from 'next/link'
import { AppstoreOutlined } from '@ant-design/icons'
import { SparklesIcon } from '@heroicons/react/solid'

function Navbar () {

    return (
        <div className="flex flex-col w-80 h-full ">
            <div className="flex items-center p-4">
                <SparklesIcon />
                <span className="text-indigo-700 ml-2 text-4xl font-bold">
                    TRAIL
                </span>
            </div>

            <div className="flex flex-col mt-8 border-r-2 p-1 h-full">
                <p className="my-4 pl-4">Find out more about...</p>
                
                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 rounded-lg p-1 px-4 w-full my-2">
                        <AppstoreOutlined />
                        <span className="ml-4">Operating Guidelines</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 p-1 px-4 w-full my-2">
                        <AppstoreOutlined />
                        <span className="ml-4">Employee Management</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 p-1 px-4 w-full my-2">
                        <AppstoreOutlined />
                        <span className="ml-4">Business Forecast</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 p-1 px-4 w-full my-2">
                        <AppstoreOutlined />
                        <span className="ml-4">Risk Assessment</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 p-1 px-4 w-full my-2">
                        <AppstoreOutlined />
                        <span className="ml-4">Grants and Support</span>
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Navbar