import React, { 
    createContext,
    useContext,
    useState,
    ReactNode 
} from 'react';

import * as AuthSession from 'expo-auth-session';

import {
    CDN_IMAGE,
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE
} from '../configs';
import { api } from '../services/api';

interface User{
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

interface AuthContextData{
    user: User;
    singIn(): void;
}

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps){
    const [ user, setUser ] = useState<User>({} as User);
    const [ loading, setLoading ] = useState<Boolean>(false);

    async function singIn() {
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            

            const response = await AuthSession.startAsync({ authUrl });
            console.log(response);

        } catch {
            throw new Error('Não foi possível autenticar');
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                user,
                singIn
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
};