'use client'

import {useRouter} from "next/navigation";
import { useState, useEffect } from "react"

export default function TelegramAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const response = await fetch('/api/session');
        if (response.ok) {
            setIsAuthenticated(true);
        }
    }

    const authenticateUser = async () => {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();
        const initData = WebApp.initData;
        if (initData) {
            try{
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(initData),
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                    router.refresh();
                }else{
                    console.error("Failed to authenticate user");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Failed to authenticate user:", error);
                setIsAuthenticated(false);
            }
        }
    }
    
    return (
      <div>
        {isAuthenticated ? (
          <>
            <p>Authenticated</p>
            <button 
                onClick={() => router.push('/protacted')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Access protected page
            </button>
          </>
        ) : (
            <div>
                <p>You need to be an owner of this account</p>
                <button
                    onClick={authenticateUser}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Authenticate
                </button>
            </div>
        )}
      </div>
    );
}