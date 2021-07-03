import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type AuthContextProviderProps = {
    children: ReactNode;
}

type UserType = {
    pic: string;
    id: string;
    name: string;
}

type AuthContextProviderValue = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextProviderValue)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    return;
                }

                setUser({
                    id: uid,
                    name: displayName,
                    pic: photoURL
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        const res = await auth.signInWithPopup(provider)

        if (res.user) {
            const { displayName, uid, photoURL } = res.user

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                pic: photoURL,
                id: uid,
                name: displayName
            })
        }

    }



    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}