import React from 'react'
import { useFormik } from 'formik'
import { UserIcon, LockOpenIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router'
import axios from 'axios';
import qs from 'qs';
import { setInMemoryToken, getInMemoryToken } from '../utils/auth'
import { useCookies } from "react-cookie"
import { addUser } from '../services/userService';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } 

    return errors;
};


const SignupForm = () => {
    const router = useRouter()
    const[cookie, setCookie] = useCookies(['user'])

    // function to log a user in and store data in cookie
    async function handleSubmit(email, password) {

        try {
            const user = await addUser(email, password, ["USER"])
            if (!user) throw "client not created"

            // log in the new user to get credentials
            const response = await axios.post("/api/login", qs.stringify({
                'email': email,
                'password': password
            }))
            if (!response) throw "new client not found"
            setInMemoryToken(response.data.access_token)

            const data = {
                'refresh_token': response.data.refresh_token,
                'user_id': user.data.clientId
            }

            setCookie("user", JSON.stringify(data), {
                path: "/",
                maxAge: 36000, // Expires after 10hr
                sameSite: true,
            })
            router.push('/signup/details') 

        } catch(e) {
            console.log(e)
            alert("error signing up")
        }
    }   

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validate,
        onSubmit: values => {
            handleSubmit(values.email, values.password);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col">

        <div className="flex border-2 w-80 items-center rounded-sm">
            <UserIcon className="h-6 w-6 my-2" />
            <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="h-full w-full p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />
        </div>

        {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

        <div className="flex border-2 w-80 items-center mt-4 rounded-sm">
            <LockOpenIcon className="h-6 w-6 my-2" />
            <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="h-full w-full p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            />
        </div>

        {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
        ) : null}

        <button className=" mt-4 p-2 rounded-sm bg-blue-500 text-white" type="submit">Sign Up</button>

        </form>
    );
};

export default SignupForm