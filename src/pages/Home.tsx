import { useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import styled from 'styled-components';

import { Header } from '../components/Header';

type HomeProps = {
    className: string;
}

export function HomeComponent({ className }: HomeProps) {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    async function handleOpenChat() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/chat');
    }

    async function handleLogin() {
        await signInWithGoogle()
    }
    return (
        <div className={className}>
            <Header />
            <main>
                <div className="menu">
                    <h2>Ingresse na conversa!</h2>
                    <button onClick={handleOpenChat}>Ingressar</button>
                </div>
            </main>
        </div>
    )
}

export const Home = styled(HomeComponent)`
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    background:#0f0f0f;

    main{
        display:flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        flex:1;


        .menu{
            display:flex;
            align-items:center;
            justify-content: space-between;
            flex-flow: column nowrap;

            background-color: #9e052e;
            color:white;
            border-radius: 8px;
            width: 250px;
            height: 150px; 

            button{
                margin: 10px;
                border:none;
                outline:none;

                background: #eeeeef;
                color:#1b1b1b;
                border-radius: 5px;
                font-size: 14pt;
                cursor:pointer;

                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

                transition: all .2s;

                &:hover{
                    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);

                }
            }
        }
    }
`