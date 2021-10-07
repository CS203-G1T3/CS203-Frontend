import React from 'react'
import { useFormik } from 'formik'
import { UserIcon, LockOpenIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const router = useRouter();

async function handleSubmit(email , password) {
    try {
        const user = await Auth.signIn(email, password);

        if(!user) {            
            alert("Error signing in. Please try again.")
            router.push('login');
        }
        router.push('/');
    } 
    catch (error) {
        console.log('error logging in', error);
        alert("Error: " + error.message + ". Please try again.")
        router.push('login');
    }
}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    let strongPassword = new RegExp(`(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})`)

    if (!values.password) {
        errors.password = 'Password Required';
    } else if (strongPassword.test(values.password)) {
        errors.email = 'Invalid password';
    }
    if (!values.industry) {
        errors.industry = 'Industry Required';
    } 

    return errors;
};


const Signupform = () => {
    
    const formik = useFormik({
        initialValues: {
        companyName: '',
        companyDescription: '',
        industry: '',
        email: '',
        password: '',
        },
        validate,
        onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col">

            <div className="flex">
                <input
                id="companyName"
                name="companyName"
                type="companyName"
                placeholder="Company Name *"
                className="border-2 rounded-sm p-1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
                />

                <input
                id="companyDescription"
                name="companyDescription"
                type="companyDescription"
                placeholder="Company Description *"
                className="border-2 rounded-sm p-1 ml-4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyDescription}
                />
            </div>

            <input
            id="email"
            name="email"
            type="email"
            placeholder="Email *"
            className="w-full p-1 border-2 mt-4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />

        {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
        ) : null}


        <input
        id="password"
        name="password"
        type="text"
        placeholder="Create Password *"
        className="w-full p-1 border-2 mt-4"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
        ) : null}


        <div className="flex justify-end w-full">
            {/* TODO: FIX THIS */}
            <select 
            name="industry" id="industry" 
            value={formik.values.industry} 
            className="p-1 border-2 mt-4" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>Select an industry</option>
                <option value="red" label="red" />
                <option value="blue" label="blue" />
                <option value="green" label="green" />
            </select>
        </div>

        {formik.touched.industry && formik.errors.industry ? (
            <div className="text-red-500">{formik.errors.industry}</div>
        ) : null}


        <button className="p-2 rounded-sm bg-blue-500 text-white mt-4" type="submit">Sign Up</button>

        </form>
    );
};

export default Signupform