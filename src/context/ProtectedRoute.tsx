// ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from './ContextProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const context = useGlobalContext()
    const usenavigate = useNavigate()
    const uselocation = useLocation()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const url = `${context.holder.host()}/validToken`;

    useEffect(() => {
        async function validateToken() {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({})
                });

                //  console.log(await response.text());

                const data = await response.json();
                setIsAuthenticated(data.status)
                return data;
                // return false;
            } catch (error) {
                console.error('Token validation error:', error);
                setIsAuthenticated(false)
                return false;
            }
        }

        validateToken().then(isValid => {
            // console.log(uselocation.pathname); 
            if (!isValid.status) {
                if (uselocation.pathname !== "/signin") {
                    usenavigate("/signin")
                } 
                setIsAuthenticated(true)
            } else {
                if (uselocation.pathname === "/" || uselocation.pathname === "/signin") {
                    usenavigate("/home");
                }
            }
        });
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        // Show loading spinner or redirect if not authenticated
        return <div className="jR8x9d nyoS7c fVfPj" >
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-32 h-32">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </div>
        </div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
