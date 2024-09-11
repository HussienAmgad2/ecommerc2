import React, { createContext, useState, useEffect, useContext } from 'react';

const UserTokenContext = createContext(null);

export default function UserTokenContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    return (
        <UserTokenContext.Provider value={{ token, setToken }}>
            {children}
        </UserTokenContext.Provider>
    );
}

export const useUserToken = () => useContext(UserTokenContext);
