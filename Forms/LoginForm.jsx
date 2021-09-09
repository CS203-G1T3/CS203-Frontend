import React from 'react'
import { useFormik } from 'formik'
import { UserIcon, LockOpenIcon } from '@heroicons/react/outline';

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


const LoginForm = () => {
    
    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validate,
        onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col p-8">

        <div className="flex border-2 w-80 items-center">
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

        <div className="flex border-2 w-80 items-center mt-4">
            <LockOpenIcon className="h-6 w-6 my-2" />
            <input
            id="password"
            name="password"
            type="text"
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

        <div className="flex justify-around">
            <button className="border-2 bg-green-500 mt-4 p-1 rounded-md" type="submit">Log In</button>

        </div>
        </form>
    );
};

export default LoginForm