import { useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import styled from 'styled-components';

import loginIcon from '../assets/icons/login.svg';

type HomeProps = {
    className: string;
}

export function HomeComponent({ className }: HomeProps) {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    async function handleOpenChat() {
        if (!user) {
            return await signInWithGoogle();
        }

        history.push('/chat');
    }

    async function handleLogin() {
        await signInWithGoogle()
    }
    return (
        <div className={className}>
            <header>
                <span>React Chat</span>
                <div className="user">
                    <span>{user?.name}</span>
                    {user ? (
                        <img src={user?.pic} alt="Foto de perfil Google" />
                    ) : ''}
                    <button onClick={handleLogin}>
                        <img src={loginIcon} alt="Icone de login" />
                        <p>
                            {!user ? 'Fazer login com conta Google' : 'Trocar de conta'}
                        </p>
                    </button>
                </div>

            </header>
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

    header{
        display:flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        padding: 0px 8px;
        background-color:#9e052e;
        color:white;

        .user{
            display:flex;
            align-items:center;
            gap:5px;

            img{
                width:40px;
                height:auto;
                border-radius: 50%50%;
            }

            button{
                border:none;
                outline:none;
                padding: 1px 5px;
                border-radius: 8px;
                font-size: 12pt;
                background-color:#d32424;
                color:white;
                cursor:pointer;
                display: flex;
                align-items: center;
                gap:4px;
                transition: all .2s;

                &:hover{
                    filter: brightness(.85);
                }

                img{
                    height: 100%;
                    width: auto;
                }
            }
        }
        > span{
            font-size: 20pt;
        }
    }


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