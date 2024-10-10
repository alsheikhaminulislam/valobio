import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from '../assets/logo.png'

const LoginPage = () => {
    const usenavigate = useNavigate();
    const context = useGlobalContext();
    const [isLogin, setLogin] = useState(true); // Track if the user is logging in or signing up

    // Handle form submission
    const formOnSubmit = (e) => {
        e.preventDefault();

        // Construct data object based on environment
        const data = {
            email: e.target.email.value,
            password:  e.target.password.value,
        };

        // Determine the appropriate API call based on login or signup
        const action = isLogin ? "login" : "register"; // Assuming you have a signup endpoint

        if (!isLogin) {
            if (e.target.password.value !== e.target.repassword.value) {
                toast.error("Passwords do not match.");
                return;
            }
        }

        // Attempt to login or signup
        context.https.post(action, data)
            .then((response) => {
                if (response.status) {
                    usenavigate("/home");
                }
            })
            .catch(() => {
                usenavigate("/");
            });
    };

    // Check if a valid token exists and redirect if necessary


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="ValoXity"
                    src={Logo}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {isLogin ? "Sign In" : "Sign Up"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formOnSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Show re-password field only for sign-up */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="repassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Re-Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="repassword"
                                    name="repassword"
                                    type="password" 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isLogin ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </form>

                {/* Toggle between login and signup */}
                <p className="mt-10 text-center text-sm text-gray-500" onClick={() => setLogin((prev) => !prev)}>
                    {isLogin ? "I don't have an account." : "I have an account."}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        {isLogin ? " Sign up." : " Sign in."}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
