import React, { 
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';


    const { CDN_IMAGE } = process.env;
    const { CLIENT_ID } = process.env;
    const { REDIRECT_URI } = process.env;
    const { RESPONSE_TYPE } = process.env;
    const { SCOPE } = process.env;
    
import { api } from '../services/api';
import { COLLECTION_USER } from '../configs/database';

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
    loading: Boolean;
    singIn(): void;
    singOut(): void;
}

interface AuthProviderProps{
    children: ReactNode;
}




type AuthorizationResponse = AuthSession.AuthSessionResult &{
    params: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps){
    const [ user, setUser ] = useState<User>({} as User);
    const [ loading, setLoading ] = useState<Boolean>(false);

    async function singIn() {
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            

            const { type, params } = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse;
            
            if(type === "success" && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');

                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;
      
                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
                setUser(userData);
            }
            
        } catch {
            throw new Error('N??o foi poss??vel autenticar');
        }finally{
            setLoading(false);
        }
    }

    async function singOut(){
        try {
            await AsyncStorage.removeItem(COLLECTION_USER);
            setUser({} as User);
        } catch (error) {
            
        }
    }

    async function loadUserStorageData(){
        const storage =  await AsyncStorage.getItem(COLLECTION_USER);

        if(storage){
            const userLogged = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`

            setUser(userLogged)
        }
    }

    useEffect(() => {
        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                user,
                loading,
                singIn,
                singOut
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